const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.PLATFORM_TABLE

AWS.config.update({region: "us-east-1"})

const create = async (platform) => {
    const params = {
        TableName,
        Item: {
            'id': platform.id,
            'name': platform.name,
            'manufacturer': platform.manufacturer,
            'weight': platform.weight,
            'year': platform.year,
            'version': platform.version,
            'activate': platform.activate,
            'createdAt': platform.createdAt,
            'updatedAt': platform.updatedAt
        }
    }

    return await dynamoDB.put(params).promise()
}

const findById = async (id) => {
    const params = {
        TableName,
        Key: {'id': id}
    }
    const item = await dynamoDB.get(params).promise()
    const platform = item.Item ? item.Item : undefined
    return platform && platform.activate ? platform : undefined
}

const findAll = async () => {
    const params = {
        TableName,
        FilterExpression: '#act = :activate',
        ExpressionAttributeNames: { '#act': 'activate', },
        ExpressionAttributeValues: { ':activate': true }
    }
    
    const items = await dynamoDB.scan(params).promise()
    return items.Items ? items.Items : undefined
}

const update = async (platform) =>{
    const params = {
        TableName,
        Item: {
            'id': platform.id,
            'name': platform.name,
            'manufacturer': platform.manufacturer,
            'weight': platform.weight,
            'year': platform.year,
            'version': platform.version,
            'activate': platform.activate,
            'createdAt': platform.createdAt,
            'updatedAt': platform.updatedAt
        }
    }

    return await dynamoDB.put(params).promise()
}

const remove = async (id) => {
    const params = {
        TableName,
        Key: {'id': id},
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: {':id': id}
    }

    return await dynamoDB.delete(params).promise()
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
}