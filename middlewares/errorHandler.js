function errorHandler(err, req, res, next) {

    res.status(500).json({
        error: "500",
        message: err.message
    })
}

module.exports = errorHandler