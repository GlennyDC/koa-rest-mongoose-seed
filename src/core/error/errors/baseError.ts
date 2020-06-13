import { ErrorCode } from '../errorCode';

/**
 * Abastract class for all known server errors.
 */
abstract class BaseError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly timestamp: string;

  /**
   * @param {string} message - Description of the error intended for developers
   * @param {ErrorCode} code - Short human-readable, globally unique code of the error that enables the client to perform corrective actions
   * @param {number} status - HTTP status code
   */
  constructor(message: string, code: ErrorCode, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.timestamp = new Date().toISOString();

    /**
     * Maintain proper stack trace for where our error was thrown
     * (only available on V8)
     */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Make the name property of the error non-enumerable, which means that
     * it won't show up when iterated through the object using Object.keys()
     * or a for...in loop. You can still access the property directly
     * on the object though.
     */
    Object.defineProperty(this, 'name', { value: this.constructor.name });
  }
}

export { BaseError };
