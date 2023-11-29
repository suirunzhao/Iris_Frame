const express = require('express');
const app = express();
let port = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');

// Static Files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, ()=> {
    console.log('listening at ', port);
});
    

// MongoDB setup
const mongoUri = 'mongodb+srv://szhao25:siri2023@siri.q9fi4px.mongodb.net/?retryWrites=true&w=majority'; // Replace with your URI
const client = new MongoClient(mongoUri);

async function getImages() {
    try {
        await client.connect();
        const database = client.db('test'); // Replace with your DB name
        const collection = database.collection('links'); // Replace with your collection name
        // Fetching documents sorted by _id in descending order
        const imageDocuments = await collection.find({}).sort({ _id: -1 }).toArray();

        // Extracting the image URLs from the documents
        const images = imageDocuments.map(doc => ({ url: doc.image_url }));
        return images;
    } finally {
        await client.close();
    }
}

app.get('/images', async (req, res) => {
    const images = await getImages();
    res.json(images);
});