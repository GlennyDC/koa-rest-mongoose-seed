import config from 'config';

export const getEnvironmentVariable = <T>(
  environmentVariableName: string,
): T => {
  const environmentVariable = config.get(environmentVariableName);
  return (environmentVariable as unknown) as T;
};
