const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");
const getDb = require("../util/database").getDb;

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then(result => {
        console.log("result"+result);
      })
      .catch(error => {
        console.log(error);
      });
  }

  static fetchAll() {
    console.log("fetching...");
    const db = getDb();
    return db
    .collection("products")
    .find().toArray()
      .then(result => {
        //console.log(result);
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }*/

  /*static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll() {
    console.log("fetching...");
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }*/
};
