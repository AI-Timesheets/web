class GenericException extends Error {
    constructor(message, data) {
        super(message);
        this.name = "GenericException";
        this.message = message;
        this.data = data;
    }
}

export default GenericException;
