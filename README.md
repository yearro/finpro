# finpro

finpro is a project to explore hexagonal architecture.

The backend is a model for users to register and with this information to be able to add loans, the next step is to add the payments for these loans.

# Requirements

node version v18.15.0

Docker

### Create instance of dedatabase server

```
docker compose up -d
```

**Verify that the container has been created and is active**

## Install

```
yarn install / npm install
```

## Build

```
yarn build / npm run build
```

## Run development mode

```
yarn dev / npm run dev
```

## Check lint

```
yarn lint / npm run lint
```

## Fix lint

```
yarn lint:fix / npm run lint:fix
```

## Auto format

```
yarn format / npm run format
```

## Run production mode

```
yarn prod / npm run prod
```

## Testing the endpoints

Inside the [Postman](https://github.com/yearro/finpro/blob/main/Postman/Finpro.collection.json) folder there is a collection so you can test the endpoints of the project
