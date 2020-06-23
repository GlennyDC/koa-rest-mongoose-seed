# API seed

## Features

#### Advanced input validation

Although GraphQL already provides a powerful query validation scheme, a more advanced input validation is achieved with [Joi](https://github.com/hapijs/joi 'Joi repository'). The GraphQL query validation indicates if a query is valid (e.g. do the requested fields exist, are all the required inputs present and of the correct type, ...). The Joi input validation on the other hand indicates if the received input is valid against a custom defined schema (e.g. is a number not too big, if one input is present, another one should be present aswell, ...). If the provided input does not match its schema, an error with code `INPUT_INVALID_ERROR` will be returned by the server. The error is enhanced with a brief description of the validation errors.

#### Docker

TODO

## File hierarchy

TODO

## Scripts

TODO

## Design considerations

TODO

## TODO

Below is a summarization of the upcoming tasks necessary to complete this API seed.

### Must have

- [ ] Automatic configuration of global variables in and out of Docker
- [ ] Add uniform error handling
- [ ] Fine tune ESlint, husky and lint-staged
- [ ] Add correct TypeScript types
- [x] Fix production and development stacktrace mapping to ts instead of compiled js files
- [x] Get rid of ts-node and use tsc for dev and prd
- [x] Add working multi-stage Docker setup
- [ ] Add uniform JSDocs
- [ ] Complete this README
- [ ] Add some sort of automatic outdated dependencies / vulnerabilities resolver (Dependabot?, Snyk?)
- [ ] Add morgan logging (with request ids ofcourse)
- [ ] Apply pretty much everything from https://github.com/goldbergyoni/nodebestpractices
- [ ] CI (switch to GitLab?)
- [ ] CD (switch to GitLab?)
- [ ] Bump dependency versions
- [ ] Add automatic resolver types with https://graphql-code-generator.com/
- [ ] Add tests (Jest?)
- [ ] Add test coverage (Istanbul?)
- [x] Add robust GraphQL input validation with Joi
- [x] Add common middlewares such as koa-helmet, cors, ...
- [ ] Add JSDoc to HTML generator
- [ ] Add `import type` where necessary
- [ ] Add a database (PostgreSQl?, MongoDb?)
- [ ] Add an ORM (Sequelize?, Mongoose?)
- [ ] Figure out a robust and almost transparent for front-end refetch token mechanism
- [ ] Add DataLoader to solve the N+1 GraphQL problem

### Nice to have

- Switch from cls-hooked to native Node async_hooks for performance optimalization
- Respect the default exports from node_modules (no `esModuleInterop` and `allowSyntheticDefaultImports`?)
- Lay out foundation to optionally add a REST API
- Add HTTP caching (Redis?)
- Split main entrypoint in two parts: Node related and server related
- Add protected branches mechanism (switch to GitLab?)

### Remarks

- Check for a more strict eslint config. For example the `require-await` rule is not enabled per default.
- Check for faster transpile time with `ts-node`. `--transpile-only` ?
- Put in linting / tests inside Docker prd multi-stage?
