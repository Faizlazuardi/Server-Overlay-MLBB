const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
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
