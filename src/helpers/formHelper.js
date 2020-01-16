function setFieldErrors(fieldErrors, fieldsValid, errors) {
    console.log(fieldErrors, errors);
    for (const key of Object.keys(errors)) {
        if (fieldErrors.hasOwnProperty(key)) {
            fieldErrors[key] = errors[key].join("<br />");
        }

        if (fieldsValid.hasOwnProperty(key)) {
            fieldsValid[key] = false;
        }
    }
}

module.exports = {
    setFieldErrors,
};
