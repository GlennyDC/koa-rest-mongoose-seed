export default {
  server: {
    port: 3000,
    hostName: '0.0.0.0',
    logging: {
      level: 'silly',
      console: true,
      file: false,
    },
    graphql: {
      enablePlayground: true,
      enableIntrospection: true,
      exposeErrorStackTraces: true,
      exposeUnknownErrors: true,
    },
  },
  auth: {
    tokenIssuer: 'api-seed',
    tokenAudience: 'api',
    tokenSubject: 'authentication',
    tokenSecret: 'J6AqU3s49NH%K[z$rmPanx8Z9gGQJnhsC;qYt3Hzo[#Kj7d[',
    tokenExpirationInterval: 60 * 60, // 1 hour
  },
  spacex: {
    baseUrl: 'https://api.spacexdata.com/v3',
  },
};
