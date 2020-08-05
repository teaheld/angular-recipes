const invalidData = (req, res, next) => {
    const error = new Error('INVALID_DATA');
    error.status = 400;

    next(error);
};

module.exports = invalidData;