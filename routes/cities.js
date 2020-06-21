let express = require('express');
let router = express.Router();

const api = require('../db/api/cities');

router.get('/', async function (req, res, next) {
  try {
    const cities = await api.allCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/withApartments', async function (req, res, next) {
  try {
    const cities = await api.allCitiesWithApartments();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:cityId', async (req, res, next) => {
  try {
    const city = await api.getCityById(req.params.cityId);
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
