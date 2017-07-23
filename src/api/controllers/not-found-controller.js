export default (request, response) => {
    response.status(404).json({
        status: 404
    })
}