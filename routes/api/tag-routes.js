//finished
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data
  router.get('/', async (req, res) => {
  try {
    const categoryData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(400).json({ message: 'There are no tags found with that id, please re-enter data' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    if (req.body.productIds.length) {
      const productTagIdArr = req.body.productIds.map( (product_id) => {
        return {
          product_id,
          tag_id: tagData.id
        };
      })
      const productTagData = await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        }
        });
        if (!tagData[0]) {
          res.status(404).json({ message: 'There are no tags with this id, please re-enter data' });
          return;
        }

        res.status(200).json(tagData);
      } catch (err) {
        res.status(500).json(err);
      }
    });

//delte on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'There is no tag with this id, please re-enter data'});
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
