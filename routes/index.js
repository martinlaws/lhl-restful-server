const express = require('express');
const router = express.Router();

const petsDB = [
  { id: 1, name: 'Maya', imgURL: 'https://i.imgur.com/YU3ADxA_d.jpg?maxwidth=640&shape=thumb&fidelity=medium' },
  { id: 2, name: 'Mittens', imgURL: 'https://placekitten.com/300/300' }
];

const filterPets = id => petsDB.find(pet => pet.id === Number(id));
const findPetIndex = id => petsDB.findIndex( pet => pet.id === Number(id));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lighthouse Labs!' });
});

// GET pets list
router.get('/pets', (req, res) => {
  res.render('pets', { db: petsDB });
});

router.get('/pets/new', (req, res) => {
  res.render('new')
});

router.post('/pets', (req, res) => {
  const { name, imgURL } = req.body;
  const generateId = () => petsDB.length + 1;
  const newPet = {
    name,
    imgURL,
    id: generateId()
  };

  petsDB.push(newPet)
  res.redirect(`/pets/${ newPet.id }`)
});

router.get('/pets/:id', (req, res) => {
  res.render('pet', { pet: filterPets(req.params.id) });
});

router.get('/pets/:id/edit', (req, res) => {
  res.render('edit', { pet: filterPets(req.params.id) });
});

router.post('/pets/:id/edit', (req, res) => {
  const {
    id,
    name,
    imgURL
  } = req.body;

  petsDB[findPetIndex(id)] = { id: Number(id), name, imgURL };

  res.redirect(`/pets/${ id }`);
});

router.get('/pets/:id/delete', (req, res) => {
  const { id } = req.params.id;

  petsDB.splice(findPetIndex(id), 1);

  res.redirect('/pets')
})

module.exports = router;
