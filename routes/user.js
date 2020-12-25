const model = require('../model');
const router = require('koa-router')()

let { User } = model;

const userInfoController = require('../controllers/user')
// router.prefix('/user')

router.get('/get', userInfoController);

router.post('/post', userInfoController);

module.exports = router
