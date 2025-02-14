const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));

});

router.get('/ingame', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/inGame.html'));
});

router.get('/draftpick', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/public/draftPick.html'));
});

module.exports = router;
