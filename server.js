import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const dataFilePathContinent = path.join(__dirname, 'country-by-continent.json');
console.log(dataFilePathContinent);

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allow specific headers
    next();
});

function readContinentData() {
    const data = fs.readFileSync(dataFilePathContinent);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(dataFilePathContinent, JSON.stringify(data, null, 2));
}

app.get('/api/coninent', (req, res) => {
    const data = readContinentData();
    const containent = data.countries.map(country => ({
        country: country.country,
        continent: country.continent
    }));
    res.json(containent);
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export { app };
