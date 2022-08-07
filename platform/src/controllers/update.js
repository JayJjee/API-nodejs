const { toUpdate, listId } =  require('../services/platform-service.js')
const { formatError, formatResponse, serialize } = require('../format.js')

module.exports.handler = async (event) => {
    try {
        const id = event.pathParameters.id
        const canonical = JSON.parse(event.body)

        const fetchedPlatform = await listId(id)

        fetchedPlatform.manufacturer = canonical.manufacturer
        fetchedPlatform.name = canonical.name
        fetchedPlatform.updatedAt = canonical.updatedAt
        fetchedPlatform.version = canonical.version
        fetchedPlatform.weight = canonical.weight
        fetchedPlatform.year = canonical.year

        await toUpdate(fetchedPlatform)
        return formatResponse(201, serialize(fetchedPlatform))
    } catch (error) {
        console.error(`UPDATE ERROR`, error)
        return formatError(500, error)
    }
}