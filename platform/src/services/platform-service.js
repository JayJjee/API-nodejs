const { findAll, findById, create, update, remove} = require('../repositories/platform-repository.js')
const { v4: uuidv4} = require('uuid')

const listAll = async () => {
    const platforms = await findAll()

    return platforms
}

const listId = async (id) => {
    const platform = await findById(id)

    return platform
}

const save = async (platform) => {
    const currenDateTime = new Date().toISOString()

    platform.activate = true
    platform.createdAt = currenDateTime
    platform.updatedAt = currenDateTime

    const fetchedPlatform = await create(platform)

    return fetchedPlatform
}

const toUpdate = async (platform) => {
    const currenDateTime = new Date().toISOString()
    platform.updatedAt = currenDateTime
    const fetchedPlatform = await update(platform)

    return fetchedPlatform
}

const toRemove = async (platform) => {
    const currenDateTime = new Date().toISOString()
    platform.updatedAt = currenDateTime
    platform.activate = false

    const fetchedPlatform = await update(platform)

    return fetchedPlatform
}
module.exports = {
    listAll,
    listId,
    save,
    toUpdate,
    toRemove
}