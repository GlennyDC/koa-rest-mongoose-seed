// @ts-nocheck
import { toApolloError } from 'apollo-server-koa';

import { BaseError } from './baseError';

// const makePublicExtensionsMapFromError = (error: any): Record<string, any> => {
//   const publicExtensionsMap = Object.keys(error).reduce(
//     (acc: Record<string, any>, curr: string) => {
//       if (curr !== 'name') {
//         return { ...acc, [curr]: error[curr] };
//       } else {
//         return acc;
//       }
//     },
//     {},
//   );

//   return publicExtensionsMap;
// };

/**
 *
 * NOTE: Watch out for Apollo Server 3.0 release
 * (https://github.com/apollographql/apollo-server/milestone/16)
 * and especially this issue:
 * https://github.com/apollographql/apollo-server/issues/3835
 *
 * @param error
 *
 * @returns
 */
const formatError = (error: any) => {
  const { originalError, path, locations } = error;

  if (originalError instanceof BaseError) {
    return toApolloError(error, originalError.code);
  } else {
    return toApolloError({ path, locations });
  }
};

export { formatError };
