const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => { 
  try {
    const categoryData = await Category.findAll({
      include: [Product]
  })
    res.json(categoryData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {id: req.params.id}, include: [Product]

    })
    res.json(categoryData);
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    return res.json(categoryData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.json(categoryData);

  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(categoryData);
    
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

module.exports = router;
