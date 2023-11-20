const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag}]
    })
    res.json(tagData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      }, include: [{model: Product, through: ProductTag}] 
    })
    return res.json(tagData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
  
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.json(tagData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(tagData)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(tagData);
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Something is broken.'})
  }
});

module.exports = router;
