const Redis = require('ioredis')
const { Store } = require('koa-session2')
const redisConf = require('./conf/redisConfig')

class RedisStore extends Store {
    constructor() {
        super()
        this.redis = new Redis(redisConf)
    }

    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`)
        return JSON.parse(data)
    }

    async set(session, { sid = this.getID(24), maxAge = 60 * 60 * 1000 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
        } catch (error) {
            console.log('redis-set-error: ', error)
        }
        return sid
    }

    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;