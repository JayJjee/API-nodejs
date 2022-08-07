const { save } =  require('../services/platform-service.js')
const { formatError, formatResponse, serialize } = require('../format.js')

module.exports.handler = async (event) => {
    try {
        const canonical = JSON.parse(event.body)
        await save(canonical)
        return formatResponse(201, serialize(canonical))
    } catch (error) {
        console.error(`SAVE ERROR`, error)
        return formatError(500, error)
    }
}