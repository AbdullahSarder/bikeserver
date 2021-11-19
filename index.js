const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const { MongoClient } = require('mongodb');

const ObjectID=require('mongodb').ObjectId;


const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fkk0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db('bikepavelion'); 
        const bikeCollection = database.collection('bikepavelion'); 
        const brandCollection = database.collection('bikebrand'); 
        

        console.log('everythung ik');

         //GGet api multipal data for All bike 
        app.get('/bikepavelion', async(req, res)=>{
            const cursor =bikeCollection.find({});
            const bikepavelion = await cursor.toArray();
            res.send(bikepavelion);
        })

            //GGet api single bike
        app.get('/bikepavelion/:id', async(req, res)=>{
                const id=req.params.id;
                const query={_id:ObjectID(id)};
                const cursor =await bikeCollection.findOne(query);
                res.json(bikepavelion);
        })





        //GGet api multipal data for All brand  
        app.get('/bikebrand', async(req, res)=>{
        const cursor =brandCollection.find({});
        const bikebrand = await cursor.toArray();
        res.send(bikebrand);
        })
            
        app.post('/bikes', async (req, res) => {
            const bike = req.body;
            const result = await bikeCollection.insertOne(bike);
            res.json(result)
        });
    }
    finally{

    }
}


run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Bikers')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})

