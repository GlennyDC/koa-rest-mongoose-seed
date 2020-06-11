abstract class BaseError extends Error {
  code: string;
  httpStatusCode: number;
  timestamp: string;

  constructor(message: string, code: string, httpStatusCode: number) {
    super(message);
    this.code = code;
    this.httpStatusCode = httpStatusCode;
    this.timestamp = new Date().toISOString();

    /**
     * Make the name property of the error non-enumerable.
     * Which means that it won't show up when iterated through the object
     * using Object.keys() or for...in loop. You can still access the property
     * directly on the object though.
     */
    Object.defineProperty(this, 'name', { value: this.constructor.name });
  }
}

export { BaseError };
