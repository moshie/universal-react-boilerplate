function setDate(model = {}) {

    model.updated_at = new Date()

    if (!model.created_at) {
        model.created_at = model.updated_at
    }

    return model
}

export default setDate