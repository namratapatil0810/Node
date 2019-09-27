const mongodb = require("mongodb");
const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const db = require("../util/database");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this._id = new mongodb.ObjectID(id);
  }

  save() {
    console.log("0");
    const db = getDb();
    let dbOp;
    console.log("1");
    if (this._id) {
      console.log("2");
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      console.log("3");
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then(result => {
        return result;
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
      .find()
      .toArray()
      .then(result => {
        //console.log(result);
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then(product => {
        return product;
      })
      .catch(error => {
        console.log(error);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*const p = path.join(
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
*/
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
}

module.exports = Product;
