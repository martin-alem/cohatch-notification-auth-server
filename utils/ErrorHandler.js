class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    return this;
  }
}

export default ErrorHandler;
