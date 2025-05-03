/*const express =  require('express');
const Client =  require('../model/client.model'); 
const router = express.Router();

app.post('/', async (req,res) =>{
    try {
        const client = await Client.create(req.body); 
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}); */