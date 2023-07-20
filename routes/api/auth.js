const express = require('express');

const router = express.Router();

const { auth } = require('../../middlewares/index');

const { auth: ctrl } = require('../../controllers/index');

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout);

router.patch('/', auth, ctrl.updateSubscriptionUser);

module.exports = router;
