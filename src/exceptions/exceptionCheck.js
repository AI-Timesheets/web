function isGenericException(e) {
    return e.name === "GenericException";
}

function isFormException(e) {
    return e.name === "FormException";
}

module.exports = {
    isGenericException,
    isFormException,
};