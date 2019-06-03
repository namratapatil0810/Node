const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const app = express();
const mongoConnect = require("./util/database");

const errorController = require("./controllers/error");
/* const db = require("./util/database"); */

app.set("view engine", "ejs");
app.set("views", "views");

/*
db.execute("SELECT * FROM products where id = 1")
  .then(([product]) => {
    console.log(product);
  })
  .catch(err => {
    console.log(err);
  });
*/
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
*/
//app.use("/admin", router);
//app.use(shopRoutes);

app.use(errorController.error404);

mongoConnect(client => {
  console.log(client);
  app.listen(3000);
});
