function setDate(model = {}) {
    if (Array.isArray(model) || typeof model != 'object') {
        throw new Error('Unexpected Argument')
    }

    model.updated_at = new Date()

    if (!model.created_at) {
        model.created_at = model.updated_at
    }

    return model
}

export default setDate