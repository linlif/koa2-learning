const model = require('./model.js');

!(async () => {
    await model.sync();
    console.log('sync db ok.');
    process.exit(0);
})();
