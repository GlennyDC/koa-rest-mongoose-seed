export const getEnvironmentVariable = <T>(
  environmentVariableName: string,
): T => {
  const environmentVariable = process.env[environmentVariableName];
  if (!environmentVariable) {
    throw new Error('Environment variable is not set');
  }
  // TODO cast
  return (environmentVariable as unknown) as T;
};
