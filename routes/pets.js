const model = require('../model');
const router = require('koa-router')()

let { Pet } = model;

// router.prefix('/pets')

router.get('/get', async (ctx, next) => {
  console.log(' ctx.request.query', ctx.request.query)

  const { id } = ctx.request.query;
  const pets = await Pet.findAll({
    where: {
      id
    }
  });
  console.log(`find ${pets.length} Pet:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
  ctx.body = {
    success: true,
    data: pets
  }
})

router.post('/post', async function (ctx, next) {
  console.log(' ctx.request.body', ctx.request.body)
  const { id } = ctx.request.body;
  const pets = await Pet.findAll({
    where: {
      id
    }
  });
  console.log(`find ${pets.length} Pet:`);
  for (let p of pets) {
    console.log(JSON.stringify(p));
  }
  ctx.body = {
    success: true,
    data: pets
  }
})

module.exports = router
