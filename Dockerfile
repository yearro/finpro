FROM node:alpine3.16 AS DEPLOYMENT

RUN apk add curl bash --no-cache

RUN curl -sf https://gobinaries.com/tj/node-prune | sh -s -- -b /usr/local/bin

WORKDIR /build

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

RUN yarn install --production

RUN /usr/local/bin/node-prune

FROM node:alpine3.16

WORKDIR /app

COPY --from=DEPLOYMENT /build/node_modules ./node_modules

COPY --from=DEPLOYMENT /build/package.json ./package.json

COPY --from=DEPLOYMENT /build/dist ./dist

CMD ["yarn", "run", "prod"]
