const methodNotAllowed = (req, res, next) => {
    const error = new Error('Method Not Allowed');
    error.status = 405;

    next(error);
};

module.exports = methodNotAllowed;