const seq = require('../seq');
const { STRING, BOOLEAN, BIGINT, INTEGER, TEXT } = require('../types');

// 创建Modal
var Blog = seq.define('Blog', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片'
    }
});

module.exports = Blog;