const axios = require('axios');
const csv = require('csv-parser');
const { Readable } = require('stream');
require('dotenv').config();

// URL spreadsheet dalam format CSV
const spreadsheetUrl = process.env.SPREADSHEET_URL;

// Fungsi untuk mengambil dan mengonversi data dari spreadsheet
async function fetchSpreadsheetData() {
    try {
        // Ambil data dari spreadsheet
        const response = await axios.get(spreadsheetUrl);
        
        // Konversi CSV ke JSON
        const results = [];
        const stream = Readable.from(response.data);

        return new Promise((resolve, reject) => {
            stream
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}

module.exports = { fetchSpreadsheetData };