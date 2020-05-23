# Production stage
FROM node:14.2-slim AS prd
ENV NODE_ENV=production
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile && yarn cache clean
COPY --chown=node:node . .
CMD ["node", "-r", "ts-node/register", "src/index.ts"]

# Development stage
FROM prd AS dev
ENV NODE_ENV=development
USER root
RUN yarn global add nodemon
USER node
CMD ["nodemon", "--config" , "nodemon.json"]
