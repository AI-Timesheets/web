function setFieldErrors(fieldErrors, errors) {
    for (const key of Object.keys(errors)) {
        if (fieldErrors.hasOwnProperty(key)) {
            fieldErrors[key] = errors[key].join("<br />");
        }
    }
}

module.exports = {
    setFieldErrors,
};
