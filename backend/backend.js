const { Client, Databases } = require('appwrite');

// Replace these with your actual Appwrite details
const appwriteEndpoint = 'https://cloud.appwrite.io/v1'; // Your Appwrite endpoint
const appwriteProjectID = 'YOUR_PROJECT_ID'; // Your Appwrite project ID 

const client = new Client();
client
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectID);

const databases = new Databases(client);

// ... (Add your API routes and functions here)

async function createPetition(req, res) {
    try {
        const petitionData = req.body; 
        const createdPetition = await databases.createDocument(
            'YOUR_DATABASE_ID', // Replace with your actual database ID
            'YOUR_COLLECTION_ID', // Replace with your actual collection ID
            petitionData
        );

        res.status(201).json({ message: 'Petition created', petition: createdPetition });
    } catch (error) {
        console.error('Error creating petition:', error);
        res.status(500).json({ error: error.message });
    }
}

async function getPetitions(req, res) {
    try {
        const petitions = await databases.listDocuments(
            'YOUR_DATABASE_ID', // Replace with your actual database ID
            'YOUR_COLLECTION_ID' // Replace with your actual collection ID
        );

        res.status(200).json(petitions);
    } catch (error) {
        console.error('Error getting petitions:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPetition,
    getPetitions,
    databases // Expose the databases object for potential other uses
};