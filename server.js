import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const jsonFilePath = path.join(__dirname, 'country-by-continent.json');
let countryData;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

try {
    const rawData = fs.readFileSync(jsonFilePath, 'utf8');
    countryData = JSON.parse(rawData);
} catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    process.exit(1); // Exit if JSON data cannot be loaded
}

// Route to list all countries
app.get('/countries', (req, res) => {
    res.json({ countries: countryData });
});


// Route to list countries by continent
app.get('/countries/:continent', (req, res) => {
    const { continent } = req.params;
    const filteredCountries = countryData
        .filter(entry => entry.continent.toLowerCase() === continent.toLowerCase())
        .map(entry => entry.country);

    if (filteredCountries.length > 0) {
        res.json({ continent, countries: filteredCountries });
    } else {
        res.status(404).json({ error: `No countries found in continent: ${continent}` });
    }
});

// Route to get details about a specific country
app.get('/country/:name', (req, res) => {
    const { name } = req.params;
    const countryInfo = countryData.find(
        entry => entry.country.toLowerCase() === name.toLowerCase()
    );

    if (countryInfo) {
        res.json(countryInfo);
    } else {
        res.status(404).json({ error: `Country not found: ${name}` });
    }
});

// Default route for invalid endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

