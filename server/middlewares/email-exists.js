const emailExists = (req, res, next) => {
    const error = new Error('EMAIL_EXISTS');
    error.status = 400;

    next(error);
};

module.exports = emailExists;