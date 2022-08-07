const { toRemove, listId } =  require('../services/platform-service.js')
const { formatError, formatResponse, serialize } = require('../format.js')

module.exports.handler = async (event) => {
    try {
        const id = event.pathParameters.id
        const fetchedPlatform = await listId(id)
        await toRemove(fetchedPlatform)
        return formatResponse(201, serialize(fetchedPlatform))
    } catch (error) {
        console.error(`DELETE ERROR`, error)
        return formatError(500, error)
    }
}