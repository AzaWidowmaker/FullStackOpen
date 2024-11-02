/* eslint-disable no-unused-vars */
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        success: false,
        message: err.message || 'An unexpected error occurred',
    })
}

module.exports = errorMiddleware;