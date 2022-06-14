const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temper, Group} = require("../db.js");

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
                life_span: d.life_span,
                temperament: d.temperament,
                reference_image_id: d.reference_image_id,
                image: d.image.url,
                weight: d.weight.metric.length > 2 ? d.weight.metric.split(" - ") : [d.weight.metric, d.weight.metric],
                height: d.height.metric.length > 2 ? d.height.metric.split(" - ") : [d.height.metric, d.height.metric],  //Devuelve como array las alturas
                origin: d.origin,
                breed_group: d.breed_group
            })
        }
    )
    let allDogs = [];
    try {
        let dogsDb = await Dog.findAll({include: [{model: Temper},{model: Group}]});
        if(dogsDb.length) {
            dogsDb.map(
                (dog) => {
                    let t = [];
                    dog.tempers.map((te) => t.push(te.name))
                    let d = {
                        id: "db"+dog.id,
                        name: dog.name,
                        height: dog.height,
                        weight: dog.weight,
                        life_span: dog.years,
                        temperament: t.join(", "),
                        image: dog.image,
                        origin: dog.origin,
                        breed_group: dog.group.name
                    }
                    allDogs.push(d);
                }
            );
        }
        allDogs = allDogs.concat(dogsAPI);
        if(name){
            allDogs = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(!allDogs.length) allDogs = ["Not Found"]
        };
        res.status(200).send(allDogs);
    } catch (error) {
        console.log(error);
    }    
});

router.get("/dogs/:idRaza", async (req, res) => {
    let {idRaza} = req.params;
    try {
        if(idRaza.includes("db")){
            idRaza = parseInt(idRaza.slice(2));
            var dog = await Dog.findByPk(idRaza, {include: [{model: Temper},{model: Group}]});
            console.log(dog);
            const temp = [];
            dog.tempers.map((t) => temp.push(t.name));
            var dogById = {
                name: dog.name,
                weight: dog.weight.join(" - "),
                height: dog.height.join(" - "),
                temperament: temp.toString(),
                life_span: dog.years,
                image: dog.image,
                origin: dog.origin,
                breed_group: dog.group.name
            }
        }else{
            const {data} = await axios.get(URL);
            const dog = data.find(d => d.id === parseInt(idRaza));
            var dogById = {
                name: dog.name,
                weight: dog.weight.metric.toString(),
                height: dog.height.metric.toString(),
                temperament: dog.temperament,
                life_span: dog.life_span,
                image: dog.image.url,
                origin: dog.origin,
                breed_group: dog.breed_group
            }
        }
        
        if(!dogById) return res.status(404).send("No encontrado");
        res.send(dogById);
    } catch (error) {
        console.log(error);
    }
});

router.post("/dogs", async (req, res) => {
    const {name, height, weight, years, temp, breed_group} = req.body;
    try {
        const dog = await Dog.create(req.body);
        for(let i = 0; i < temp.length; i++){
            const tempe = await Temper.findOne({where: {"name": temp[i]}})
            dog.addTempers([tempe]);
        }
        const group = await Group.findOne({where: {"name": breed_group}});
        dog.setGroup(group);
        res.status(200).json({a:"Se agregó exitosamente: ",dog});
    } catch (error) {}
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

router.get("/groups", async (req, res) => {
    try{
        let groups = await Group.findAll();
        if(groups.length){
            let groupsDb = [];
            groups.map(
                (g) => {
                    groupsDb.push(g.name);
                }
            );
            groupsDb.sort();
            return res.send(groupsDb);
        }
        //De la API
        let {data} = await axios(URL);
        let groupsApi = [];
        data?.map(
            (d) => {
                if(d.breed_group){
                    let g = d.breed_group;
                    if(!groupsApi.includes(g)) groupsApi.push(g);
                }
            }
        )
        for(let i = 0; i < groupsApi.length; i++){
            let p = await Group.create({"name":groupsApi[i]})
        }
        console.log("De la API");
        groupsApi.sort();
        return res.send(groupsApi);
    }catch(e){
        console.log(e);
    }
});

router.delete("/dogs/:idRaza", async (req, res) => {
    const {idRaza} = req.params;
    console.log(idRaza);
    try{
        const dogDestroyed = await Dog.destroy({where:{"id":idRaza}});
        res.status(200).send("Deleted");
    }catch(e){console.log(e)}
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
