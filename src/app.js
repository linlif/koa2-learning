const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const jwt = require('koa-jwt')
const routers = require('./routes/index')
const koaStatic = require('koa-static')
const { JWT_SECRET_KEY } = require('./conf/secretKeys')
const session = require("koa-session2");
const { loginCheck } = require('./middlewares/loginChecks')
const Store = require('./Store')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())

app.use(logger())

app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(session({
  key: "SESSIONID",   //default "koa:sess"
  store: new Store()
}));

// session登录状态校验redis+session
app.use(loginCheck.unless({
  path: [/\/login/, /\/register/, /\/isExit/]
}))


// jwt校验中间件
// app.use(jwt({ secret: JWT_SECRET_KEY })
//   .unless({ path: [/\/login/, /\/register/] }));


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

!(async () => {
  // await model.sync({ force: true }); // 表同步

  // 创建Modal
  // var Pet = sequelize.define('pet', {
  //   id: {
  //     type: Sequelize.STRING(50),
  //     primaryKey: true
  //   },
  //   name: Sequelize.STRING(100),
  //   gender: Sequelize.BOOLEAN,
  //   birth: Sequelize.STRING(10),
  //   createdAt: Sequelize.BIGINT,
  //   updatedAt: Sequelize.BIGINT,
  //   version: Sequelize.BIGINT
  // }, {
  //   timestamps: false
  // });

  // // 同步模型（表）
  // await Pet.sync();
  // console.log("Pet模型表刚刚(重新)创建！");

  // let now = Date.now()

  // 插入数据
  // var dog = await Pet.create({
  //   id: 'd-' + now,
  //   name: 'Odie',
  //   gender: false,
  //   birth: '2008-08-08',
  //   createdAt: now,
  //   updatedAt: now,
  //   version: 0
  // });
  // console.log('created: ' + JSON.stringify(dog));

  // 更新数据
  // await Pet.update({ name: "Hasky2" }, {
  //   where: {
  //     name: 'Odie'
  //   }
  // });

  // 删除数据
  // await Pet.destroy({
  //   where: {
  //     name: "Hasky2",
  //     createdAt: 1608535396722
  //   }
  // });

  // 查询数据
  // var pets = await Pet.findAll({
  //   where: {
  //     name: 'Hasky2'
  //   }
  // });
  // console.log(`find ${pets.length} pets:`);
  // for (let p of pets) {
  //   console.log(JSON.stringify(p));
  // }


  let now = Date.now()

  // 插入数据
  // var person = await User.create({
  //   // id: 'd-' + now,
  //   name: 'Linif',
  //   gender: false,
  //   birth: '1993-03-20',
  //   createdAt: now,
  //   updatedAt: now,
  //   version: 0
  // });
  // console.log('created: ' + JSON.stringify(person));

  // 插入数据
  // var pets = await Pet.create({
  //   id: 'd-' + now,
  //   name: 'Hasky',
  //   gender: false,
  //   birth: '2020-12-23',
  //   createdAt: now,
  //   updatedAt: now,
  //   version: 0
  // });
  // console.log('created: ' + JSON.stringify(pets));

  // var users = await User.findAll({
  //   where: {
  //     // name: 'Odie'
  //   }
  // });
  // console.log(`find ${users.length} user:`);
  // for (let p of users) {
  //   console.log(JSON.stringify(p));
  // }

  // var pets = await Pet.findAll({
  //   where: {
  //     // name: 'Odie'
  //   }
  // });
  // console.log(`find ${pets.length} pets:`);
  // for (let p of pets) {
  //   console.log(JSON.stringify(p));
  // }

  // console.log('server start at http://localhost:3000')
})();


module.exports = app
