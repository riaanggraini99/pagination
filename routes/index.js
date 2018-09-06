var express = require('express');
var router = express.Router();
var orm = require('orm')
var totalRec = 0;
var pageSize = 6;
var pageCount = 0;
var start = 0;
var currentPage = 1;


router.use(orm.express("mysql://root:anggraini99@localhost/testpaging", {
  define: function (db, models, next) {
    models.products = db.define("tbl_products", {
      id: Number,
      product_name: String,
      price: String,
      category: String,
    });
    next();
  }
}));

router.get('/test', function (req, res, next) {
  console.log('test')
  var result = req.models.products.count({
  }, function (error, productsCount) {
    if (error) throw error;
    totalRec = productsCount;
    console.log(totalRec)
    pageCount = Math.ceil(totalRec / pageSize);
    console.log(pageCount + "disini")
    if (typeof req.query.page !== 'undefined') {
      currentPage = req.query.page;
    }

    if (currentPage > 1) {
      start = (currentPage - 1) * pageSize;
    }

    var result = req.models.products.find({}, { limit: pageSize, offset: start }, function (error, products) {
      res.render('index', { data: products, pageSize: pageSize, pageCount: pageCount, currentPage: currentPage });
    
    });
  });
});



module.exports = router;
