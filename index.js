"use strict";

/**
 * 各パッケージのimport
 */
const express = require("express");
const cors = require("cors");

/**
 * JSONデータのインポート
 */
const products = require("./data/products.json");
const categories = require("./data/categories.json");
const product = require("./data/product.json");

/**
 * expressの初期化
 */
const app = express();
const port = 1337;

// CORSを許可する
app.use(cors());

/**
 * Task: 
 * express validatorの導入
 * ルーティングをPOSTに変更
 * APIからパラメーターを受け取れるように
 */

app.get("/categories", (req, res) => {
  return res.status(200).json(categories);
});

app.get("/products", (req, res) => {
  return res.status(200).json(products);
});

app.get("/products/:product_id", (req, res) => {
  return res.status(200).json(product);
});

app.get("*", (req, res) => {
  return res.status(404).json({
    messeage: "not found"
  });
});

app.listen(port, console.log(`Express Server Litening on ${port}`));
