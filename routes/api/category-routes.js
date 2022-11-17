const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // find all categories
  // be sure to include its associated Products
 
  const findItem = async (req, res, next) => {
    try {
      if (req.params.id) {
        const categoryById = await Category.findOne({
          where: { id: req.params.id },
          include: { model: Product }
        });
        req.body.categoryById = categoryById;
      } else if (req.body.category_name) {
        const categoryByName = await Category.findOne({
          where: { category_name: req.body.category_name },
          include: { model: Product }
        });
        req.body.categoryByName = categoryByName;
      } else {
        res.status(400).send()
      }
      next();
    } catch { error => res.status(500).send () }
  }

router.get('/', async (req, res, ) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product
      }
    });
    res.status(200).send(categories)
  } catch { error => res.status(500).send() }

});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', findItem, async (req, res) => {
  try{
    req.body.categoryById
    ? res.status(200).send(req.body.categoryById)
    : res.status(404).send('Check your data, this id is not found')
  } catch { error => res.status(500).send() }

});

  // create a new category
router.post('/', findItem, async (req, res) => {
  try {
    if (req.body.categoryByName) {
      res.status(404).send('Can only POST new data!!')
    } else {
      const newCategory = await Category.create(req.body);
      res.status(200).send(newCategory);
    }
  } catch { error => res.status(500).send() }
});

// update a category by its `id` value
router.put('/:id', findItem, async (req, res) => {
  try {
    if (req.body.categoryById) {
      await Category.update(
        { category_name: req.body.category_name },
        { where: { id: req.params.id} }
      )
      const updateCategory = await Category.findOne({
        where: { id: req.params.id },
        include: { model: Product }
      })
      res.status(200).send(updateCategory);
    } else {
      res.status(404).send('Error!')
    }
  } catch { error => res.status(500).send() }
  
});

  // delete a category by its `id` value
router.delete('/:id', findItem, async (req, res) => {
  try {
    if (req.body.categoryById) {
      await Category.destroy({ where: { id: req.params.id } })
      res.status(200).send();
    } else {
      res.status(404).send('Error!!')
    }
  } catch { error => res.status(500).send() }

});

module.exports = router;
