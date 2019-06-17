'use strict';

/**
 * 各パッケージのimport
 */
const express = require('express');

/**
 * JSONデータのインポート
 */
const products = require('./data/products.json');

/**
 * express, log4jsの初期化
 */
const app = express();
const port = 80;

// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// body-parserを有効化
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

//app.use(bodyParser.json());

app.get('/', (req,res) => {
    return res.status(200).json(products);
});

app.listen(
    port,
    console.log(`Express Server Litening on ${port}`)
);