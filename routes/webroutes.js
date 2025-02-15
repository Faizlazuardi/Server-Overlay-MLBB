const express = require('express');
const path = require('path');
const router = express.Router();

// Pastikan menggunakan __dirname yang sesuai
const publicPath = path.join(__dirname, "../../client/public");

router.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

router.get("/ingame", (req, res) => {
    res.sendFile(path.join(publicPath, "inGame.html"));
});

router.get("/draftpick", (req, res) => {
    res.sendFile(path.join(publicPath, "draftPick.html"));
});

module.exports = router;
