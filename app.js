const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
app.use(cors({
    origin: [
        'https://overlay-mlbb.vercel.app',
        'http://127.0.0.1:5500', // Untuk Live Server
        'http://localhost:3000'  // Jika diperlukan
    ]
}));

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://bluktltvzslrzitntrjl.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Route API
app.get('/heroes', async (req, res) => {
    try {
        const { data, error } = await supabase.from('Heroes').select();
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/players', async (req, res) => {
    try {
        const { data, error } = await supabase.from('Players').select();
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = app;
