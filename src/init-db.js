const model = require('./model.js');

!(async () => {
    await model.sync({ force: true });
    console.log('init db ok.');
    process.exit(0);
})();
