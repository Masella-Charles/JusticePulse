const express = require('express');
const app = express();
const backend = require('./backend'); // Import your backend code

app.use(express.json()); // Parse JSON request bodies

// Example routes
app.post('/create-petition', async (req, res) => {
    await backend.createPetition(req, res); 
});

app.get('/get-petitions', async (req, res) => {
    await backend.getPetitions(req, res);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});