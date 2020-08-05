const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({
        errorMessage: error.message
    });
};

module.exports = errorHandler;