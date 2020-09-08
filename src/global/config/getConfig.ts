export const getConfig = <T>(environmentVariableName: string): T => {
  const environmentVariable = process.env[environmentVariableName];
  if (!environmentVariable) {
    throw new Error('Environment variable is not set');
  }
  return (environmentVariable as unknown) as T;
};
