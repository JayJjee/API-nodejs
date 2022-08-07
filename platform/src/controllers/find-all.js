const { listAll } = require('../services/platform-service.js')
const { formatError, formatResponse, serialize } = require('../format.js')

module.exports.handler = async (event) => {
    try {
        const platforms = await listAll()
        return formatResponse(200, serialize(platforms))

    } catch (error) {
        console.error(`FIND-ALL ERROR`, error)
        return formatError(500, error)
    }
}
