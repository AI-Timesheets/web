class FormException extends Error {
    constructor(message, fields) {
        super(message);
        this.name = "FormException";
        this.message = message;
        this.fields = fields;
    }
}

export default FormException;
