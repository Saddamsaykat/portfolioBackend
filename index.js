const express = require('express');
const cors = require('cors');
const app = express();
// const jwt = require("jsonwebtoken")


require("dotenv").config()


const port = process.env.port || 5000;


// middleware
app.use(cors());
app.use(express.json());

// pet-traction
// t4sNodRcz2PTvlaT

const {
    MongoClient,
    ServerApiVersion,
    ObjectId
} = require('mongodb');
// const { JsonWebTokenError } = require('jsonwebtoken');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.caycpiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

      const subscribe = client.db("email").collection("emailSubscribe");


      app.post('/emailApi', async (req, res) => {
        const user = req.body;
        console.log("new User", user);
        const data = await subscribe.insertOne(user)
        res.send(data);

    })


      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({
          ping: 1
      });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
  res.send("Pet Traction")
})

app.listen(port, () => {
  console.log(`Server Is running ${port}`)
})