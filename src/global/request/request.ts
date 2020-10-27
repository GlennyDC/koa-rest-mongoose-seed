import fetch, { Headers } from 'node-fetch';
import { stringify, ParsedUrlQueryInput } from 'querystring';

import { createLogger } from '../createLogger';
import { RequestError } from '../error';
import { HTTPMethod } from './httpMethod';

const logger = createLogger('request');

/**
 * Build a query string for a URL.
 *
 * @private
 *
 * @param {ParsedUrlQueryInput} queryParams - The object to serialize into a URL query string
 * @param {string} separator - The substring used to separate query parameters in the query string
 * @param {string} keyValueDelimiter - The substring used to delimit key and value pairs in the query string
 *
 * @returns {string} The URL query string
 */
const buildQueryString = (
  queryParams: ParsedUrlQueryInput,
  separator = '&',
  keyValueDelimiter = '=',
): string => stringify(queryParams, separator, keyValueDelimiter);

/**
 * Build a URL.
 *
 * Note: This function does not insert a slash between the baseURL and path.
 *
 * @private
 *
 * @param {string} baseURL - The base URL which consists of the scheme, optional authentication, domain and optional port
 * @param {string} path - The path of the resource
 * @param {ParsedUrlQueryInput} [queryParams] - Optional query parameters to be added to the URL
 *
 * @returns {string} The URL
 */
const buildURL = (
  baseURL: string,
  path: string,
  queryParams?: ParsedUrlQueryInput,
): string => {
  if (!queryParams) {
    const URL = baseURL + path;
    logger.silly(`Made request URL [${URL}]`);
    return URL;
  }
  const URL = baseURL + path + '?' + buildQueryString(queryParams);
  logger.silly(`Made request URL [${URL}]`);
  return URL;
};

/**
 * @param {string} baseURL - The base URL
 * @param {string} path - The path
 * @param {HTTPMethod} method - The HTTP method
 * @param {object} queryParams - Query params
 * @param {object} headers - Headers
 * @private
 *
 * @returns {any} The result
 */
const request = async <T>(
  baseURL: string,
  path: string,
  method: HTTPMethod,
  queryParams?: ParsedUrlQueryInput,
  headers?: Headers,
): Promise<T> => {
  const URL = buildURL(baseURL, path, queryParams);
  const response = await fetch(URL, { method, headers });

  if (!response.ok) {
    // TODO: Handle correct error handling
    // HTTP status code is not 2XX: Success
    logger.error(
      `Something went wrong with [${method}] [${URL}]: [${response.status}] [${response.statusText}]`,
    );
  }

  // TODO: What if the response is not json?
  return (await response.json()) as T;
};

export const get = async <T>(
  baseURL: string,
  path: string,
  queryParams?: ParsedUrlQueryInput,
  headers?: Headers,
): Promise<T> => {
  return request<T>(baseURL, path, HTTPMethod.GET, queryParams, headers);
};
