import { getEnvironmentVariable } from '../getEnvironmentVariable';

const EXPOSE_ERROR_STACK_TRACES = getEnvironmentVariable<boolean>(
  'EXPOSE_ERROR_STACK_TRACES',
);

const commonProperties = [
  { property: 'name', enumerable: false },
  { property: 'message', enumerable: true },
  { property: 'stack', enumerable: false },
  { property: 'code', enumerable: true },
];

const destroyCircular = ({ from, seen, to_ }: any) => {
  const to = to_ || (Array.isArray(from) ? [] : {});

  seen.push(from);

  for (const [key, value] of Object.entries(from)) {
    if (typeof value === 'function') {
      continue;
    }

    if (!value || typeof value !== 'object') {
      to[key] = value;
      continue;
    }

    if (!seen.includes(from[key])) {
      to[key] = destroyCircular({
        from: from[key],
        seen: seen.slice(),
      });
      continue;
    }

    to[key] = '[Circular]';
  }

  for (const { property, enumerable } of commonProperties) {
    if (typeof from[property] === 'string') {
      Object.defineProperty(to, property, {
        value: from[property],
        enumerable: enumerable,
        configurable: true,
        writable: true,
      });
    }
  }

  return to;
};

export const sanitizeError = (error: Error): any => {
  return destroyCircular({ from: error, seen: [] });
};
