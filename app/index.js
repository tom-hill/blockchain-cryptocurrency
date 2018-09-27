/**
 * Author: Tom Hill <tp.hill.uk@gmail.com>
 * Created: Thu 27 Sep 2018
 */

const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();

app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

app.listen(HTTP_PORT, () => console.log(`Local Server running on localhost:${HTTP_PORT}`));