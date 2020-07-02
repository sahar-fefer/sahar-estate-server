const express = require('express');
const router = express.Router();

const api = require('../db/api/apartments');

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/apartment')
  },
  // filename: function (req, file, cb) {
  //     cb(null, Date.now() + '-' + file.originalname)
  // }
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

router.get('/', async function (req, res, next) {
  try {
    const apartments = await api.getApartments(req.query);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:apartment_id/images', async function (req, res, next) {
  try {
    const images = await api.getApartmentImages(+req.params.apartment_id)
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/rent_or_sale', async function (req, res, next) {
  try {
    const rent = await api.getRentApartments();
    const sale = await api.getSaleApartments();
    res.status(200).json({rent, sale});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:user_id', async function (req, res, next) {
  try {
    const apartments = await api.getApartmentsUser(+req.params.user_id);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:user_id/:status', async function (req, res, next) {
  try {
    const apartments = await api.getApartmentsUserByStatus(+req.params.user_id, req.params.status);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', upload.single('main_image'), async function (req, res, next) {
  try {
    const { body, file } = req;
    // const path = 'images/apartment/';
    // body.main_image = `${path}${file.filename}`;
    console.log('file', file);
    console.log('body ', body);
    const apartment = await api.addApartment(body);
    res.status(201).json(apartment);
    res.status(201);
  } catch (error) {
    if (error.isValidationError) {
      res.status(200).json({ errors: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// // router.post('/', upload.single('avatar'), function (req, res, next) {
// // req.file is the `avatar` file
// // req.body will hold the text fields, if there were any
// //   })

// // router.put('/:apartment_id', async function (req, res, next) {
// //     try {
// //         const images = await api.editApartment(req.params.apartment_id)
// //         res.status(200).json(images);
// //     } catch (error) {
// //         res.status(500).json({ error: error.message });
// //     }
// // });

router.put('/:apartment_id/:availability/availability', async function (req, res, next) {
    try {
        const apartment = await api.updateAvailabilityApartment(req.params.availability, req.params.apartment_id)
        res.status(200).json(apartment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:apartment_id/:status/status', async function (req, res, next) {
  try {
      const apartment = await api.updateApartmentStatus(req.params.status, req.params.apartment_id)
      res.status(200).json(apartment);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
