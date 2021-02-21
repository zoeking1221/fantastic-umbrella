const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
 // be sure to include its associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
  .then((dbTagData) => {
    res.status(200).json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// find one tag by id
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// create new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// update tag by its 'id' value
// router.put('/:id', (req, res) => {
//   Tag.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//   .then((tag) => {
//     res.status(200).json(tag);
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(400).json(err);
//   });
// });

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with thid id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
})

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
  where: {
    id: req.params.id
  }
})
.then(dbTagData => {
  if (!dbTagData) {
    res.status(404).json({ message: 'No tag found with this id' });
    return;
  }
  res.json(dbTagData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

module.exports = router;
