const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', category-routes);
router.use('/products', product-routes);
router.use('/tags', tag-routes);

module.exports = router;
