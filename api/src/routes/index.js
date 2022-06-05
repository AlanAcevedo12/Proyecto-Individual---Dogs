const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temper} = require("../db.js");

const axios = require("axios");

const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/dogs", async (req, res) => {
    let {name} = req.query;
    const {data} = await axios(URL);
    let allDogs;
    try {
        if(!name){
            allDogs = await Dog.findAll({include: Temper});
            allDogs = allDogs.concat(data);
        }else{
            allDogs = await Dog.findAll({where: {name}});
            if(!allDogs.length){
                allDogs = data.find(e => e.name === name);
            }else{
                res.send("No se encontró el perro con el nomre: "+name)
            }
        }
        res.send(allDogs);
    } catch (error) {
        console.log(error);
    }    
});

router.get("/dogs/:idRaza", async (req, res) => {
    const {idRaza} = req.params;
    try {
        const dogById = await Dog.findByPk(idRaza, {include: Temper});
        if(!dogById) return res.status(404).send("No encontrado");
        
        res.send(dogById);
    } catch (error) {
        console.log(error);
    }
});

router.post("/dogs", async (req, res) => {
    const {name, height, weight, year, temp} = req.body;
    try {
        const dog = await Dog.create(req.body);
        for(let i = 0; i < temp.length; i++){
            const tempe = await Temper.findOne({where: {"name": temp[i]}})
            dog.addTempers([tempe]);
        }
        res.send("Se agregó exitosamente: "+temp);
    } catch (error) {
        console.log(error);
    }
});

router.get("/temperaments", async (req, res) => {
    try {
        let temperaments = await Temper.findAll();
        if(temperaments.length) return res.send({a:"Los traje de la base", temperaments});
        
        let {data} = await axios(URL);
        let tempApi = [];
        data?.map(
            (d) => {
                if(d.temperament){
                    let t = d.temperament.split(",");
                    t = t.map(a => a.trim());
                    t.map(
                        (a) => {
                            if(!tempApi.includes(a)) tempApi.push(a);
                        }
                    )
                }
            }
        )
        for(let i = 0; i < tempApi.length; i++){
            let p = await Temper.create({"name":tempApi[i]})
        }
        return res.send({a: "Los busque en axios", tempApi});
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
