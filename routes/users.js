const express = require('express');
const router = express.Router();

const crypto = require('crypto');

const api = require('../db/api/users');

router.get('/', async function (req, res, next) {
  try {
    const users = await api.allUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await api.byId(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId/apartments', async function (req, res, next) {
  try {
    const apartments = await api.apartmentsOfUser(req.params.userId);
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:userId/password', async function (req, res, next) {
  try {
    let password = await api.userPassword(req.params.userId);
    console.log('password 1', password);
    const token = crypto.pbkdf2Sync(password, 'realtorּ', 100000, 64, 'sha512');
    console.log('token', token);
    password = token.toString('base64');
    
    console.log('password 2', password);
    res.status(200).json(password);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// {
//   "email": "sahar@fefer.com",
//   "password": "EHhNveOECD2rlL2/oNeFLtl19pm3qkcyFTG4YY/jLuV3Xa5jNAJyoOLy6mY8tD3WQHZcV0yOuwCp4mbLvYkIEg=="
// }

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const token = crypto.pbkdf2Sync(password, 'realtorּ', 100000, 64, 'sha512');
    const userPasswordHashed = token.toString('base64');
    const user = await api.logIn(email, userPasswordHashed);
    const userDitails = {id: user.id, first_name: user.first_name};
    if (user) {
      res.cookie('auth', JSON.stringify(userDitails), { maxAge: 1000 * 60 * 60 * 24 * 7 });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async function (req, res, next) {
  try {
    const token = crypto.pbkdf2Sync(req.body.password, 'realtorּ', 100000, 64, 'sha512');
    const password = token.toString('base64');
    req.body.password = password;
    console.log('req.body', req.body);
    const userId = await api.addUser(req.body);
    res.status(201).json(userId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// {
//   "first_name": "sahar",
//   "last_name": "feferovich",
//   "email": "sahar@fefer.com",
//   "password": "pass",
//   "phone": "0542225532"
// }

router.put('/:id', async function (req, res, next) {
  try {
    const id = req.params.id;
    const { role_id, first_name, last_name, email, password, phone, status } = req.body;

    const user = await api.editUser(id, role_id, first_name, last_name, email, password, phone, status);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
