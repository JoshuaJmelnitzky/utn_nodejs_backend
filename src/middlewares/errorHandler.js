const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        error: {
            message: err.message || "Error interno del servidor",
            statusCode: err.statusCode || 500,
        },
    };
    res.status(errorResponse.error.statusCode).json(errorResponse);
};

module.exports = errorHandler;
