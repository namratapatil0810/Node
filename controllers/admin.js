const Product = require("../models/product");

/* redirect to add product page */
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

//after adding product || on add product click
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(result => {
      console.log("product added");
      res.redirect("/admin/products");
    })
    .catch(error => {
      console.log("error postAddProduct");
    });
};

//redirecting to edit product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(error => {
      console.log("error getEditProduct");
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDesc,
    prodId
  );
  updatedProduct
    .save()
    .then(result => {
      console.log("Product Updated!.");
      res.redirect("/admin/products");
    })
    .catch(error => {
      console.log("update product error: " + error);
    });
};

//getting products on admin side
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Products",
        path: "/admin/products"
      });
    })
    .catch(error => {
      console.log("error");
    });
};

//deleting product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(result => {
      console.log("Product Deleted!.");
      res.redirect("/admin/products");
    })
    .catch(error => {
      console.log("error");
    });
};
