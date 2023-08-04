# finpro

finpro is a project to explore hexagonal architecture

# Requirements

node version v18.15.0

Docker

### Create instance of dedatabase server

```
docker run -d -p 3310:3306 -v :/var/lib/mysql --name mysqlserver -e MYSQL_ROOT_PASSWORD=wn6nu1Y2 -e MYSQL_USER=finpro -e MYSQL_PASSWORD=wn6nu1Y2 -e  MYSQL_DATABASE=finprodb mysql:8
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
