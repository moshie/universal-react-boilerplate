function setDate(model = {}) {

    var data = {
        updated_at: new Date()
    }

    if (!model.created_at) {
        data.created_at = data.updated_at
    }

    return data
}

export default setDate