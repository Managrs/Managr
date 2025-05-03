const express =  require('express');
const mongoose = require('mongoose');
const Client =  require('./model/client.model'); 
const clientRoute = require
const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

/*
//routes
app.use("/api/client",clientRoute);
*/

app.post('/api/client', async (req,res) =>{
    try {
        const client = await Client.create(req.body); 
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect('mongodb+srv://kharafu23:NE6YTn8FpN6lAE7z@managrbackend.m0g5tzh.mongodb.net/Managr?retryWrites=true&w=majority&appName=managrBackend')
  .then(() => {
    console.log('Connected!');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch( () => {
    console.log('Connection Failed!');
});