const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temper} = require("../db.js");

const axios = require("axios");
const { Op } = require("../db");

const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/dogs", async (req, res) => {
    let {name} = req.query;
    const {data} = await axios(URL);
    const dogsAPI = [];
    data.map(
        (d) => {
            dogsAPI.push({
                id: d.id,
                name: d.name,
                bred_for: d.bred_for,
                bred_group: d.bred_group,
                life_span: d.life_span,
                temperament: d.temperament,
                reference_image_id: d.reference_image_id,
                image: d.image.url,
                weight: d.weight.metric.length > 2 ? d.weight.metric.split(" - ") : [d.weight.metric, d.weight.metric],
                height: d.height.metric.length > 2 ? d.height.metric.split(" - ") : [d.height.metric, d.height.metric],  //Devuelve como array las alturas
            })
        }
    )
    let allDogs = [];
    try {
        let dogsDb = await Dog.findAll({include: Temper});
        if(dogsDb.length) {
            dogsDb.map(
                (dog) => {
                    let t = [];
                    dog.tempers.map((te) => t.push(te.name))
                    let d = {
                        id: "db"+dog.id,
                        name: dog.name,
                        height: [dog.height, dog.height],
                        weight: [dog.weight, dog.weight],
                        years: dog.years,
                        temperament: t.join(", ")
                    }
                    allDogs.push(d);
                }
            );
        }
        allDogs = allDogs.concat(dogsAPI);
        if(name) allDogs = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
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
        if(temperaments.length){
            console.log("De la DB");
            let tempDb = [];
            temperaments.map(
                (t) => {
                    tempDb.push(t.name);
                }
            );
            tempDb.sort();
            return res.send(tempDb);
        }
        
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
        console.log("De la API");
        tempApi.sort();
        return res.send(tempApi);
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;



// router.get("/dogs", async (req, res) => {
//     let {name} = req.query;
//     const {data} = await axios(URL);
//     let allDogs;
//     try {
//         if(!name){
//             allDogs = await Dog.findAll({include: Temper});
//             allDogs = allDogs.concat(data);
//         }else{
//             allDogs = await Dog.findAll({where: {"name": {[Op.iLike]: name}}});
//             if(!allDogs.length){
//                 allDogs = data.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
//             }else{
//                 res.send("No se encontró el perro con el nomre: "+name)
//             }
//         }
//         console.log(allDogs);
//         res.send(allDogs);
//     } catch (error) {
//         console.log(error);
//     }    
// });
