const model = require('../model');
// model.sync(); // 表同步
let { User, Pet } = model;

const router = require('koa-router')()

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/:id', async function (ctx, next) {
  var id = ctx.params.id;
  var users = await User.findAll({
    where: {
      id
    }
  });
  console.log(`find ${users.length} user:`);
  for (let p of users) {
    console.log(JSON.stringify(p));
  }
  ctx.body = {
    success: true,
    data: users
  }
})


module.exports = router
