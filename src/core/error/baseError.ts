abstract class BaseError extends Error {
  code: string;
  httpStatusCode: number;
  timestamp: string;

  constructor(message: string, code: string, httpStatusCode: number) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();

    // Set the name of the error
    this.name = this.constructor.name;
  }
}

export { BaseError };
