/**
 * @description 广场页列表redis缓存
 * @author linlif
 */

const redisConf = require('../conf/redisConfig')
const Redis = require("ioredis");
const redis = new Redis(redisConf); // uses defaults unless given configuration object
const { getBlogByUser } = require('../services/blog')

const key_prefix = 'weibo:squre'

const getSquareCacheList = async ({ currentPage, pageSize }) => {
    const key = `${key_prefix} ${currentPage}_${pageSize}`

    // 尝试读取缓存
    const cacheRes = await redis.get(key)
    if (cacheRes !== null) {
        return cacheRes
    }

    try {
        // 没有缓存，读取数据库
        const result = await getBlogByUser({ currentPage, pageSize })
        // 设置缓存
        redis.set(key, JSON.stringify(result), 'EX', 10) // 1分钟过期
        return result
    } catch (error) {
        console.log('error~~~~', error)
    }
}

module.exports = {
    getSquareCacheList
}