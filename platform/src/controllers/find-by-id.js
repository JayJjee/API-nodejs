const { listId } =  require('../services/platform-service.js')
const { formatError, formatResponse, serialize } = require('../format.js')

module.exports.handler = async (event) => {
    try {
        const id = event.pathParameters.id
        const platform = await listId(id)
        return formatResponse(200, serialize(platform))
    } catch (error) {
        console.error(`FIND-BY-ID ERROR`, error)
        return formatError(500, error)
    }
}