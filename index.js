"use strict";

/**
 * 各パッケージのimport
 */
const express = require("express");
const cors = require("cors");
const { check, validationResult } = require("express-validator/check");

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
 * 国データと旅行期間を受け取り、提案する商品カテゴリー一覧を返却
 */
app.post(
  "/categories",
  [
    check("country")
      .not()
      .isEmpty(),
    check("range")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    // validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: "invalid request." });
    }

    //カテゴリ一覧をJSONで返却
    return res.status(200).json(categories);
  }
);

/**
 * category_idを受け取り、商品一覧を返却
 */
app.post(
  "/products",
  [
    check("category_id")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    // validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: "invalid request." });
    }

    // 商品一覧をJSONで返却
    return res.status(200).json(products);
  }
);

/**
 * product_idを元に、商品データ(単体)をJSONで返却
 */
app.get("/products/:product_id", (req, res) => {
  return res.status(200).json(product);
});

app.get("*", (req, res) => {
  return res.status(404).json({
    messeage: "resource not found"
  });
});

app.listen(port, console.log(`Express Server Litening on ${port}`));
