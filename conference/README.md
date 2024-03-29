# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Docker

.env file for compose example:
```
MSSQL_SA_PASSWORD=StrongPassword!23
VITE_API_URL=http://localhost:8000/api
DB_SERVER=db,1433
DB_USER=SA
TOKEN_AUDIENCE=http://localhost
TOKEN_ISSUER=http://localhost:8000
TOKEN_KEY=LongAndStrongPassword!23
ADMIN_EMAIL=admin@user.com
ADMIN_PASSWORD=StrongPassword!23
```

```
docker context create remote --docker "host=ssh://USER_NAME@ADDRESS:PORT"
docker-compose --context remote --env-file .env.remote -f .\docker-compose-remote.yml up -d
```

log size per container
```
for cont_id in $(docker ps -aq); do cont_name=$(docker ps | grep $cont_id | awk '{ print $NF }') && cont_size=$(docker inspect --format='{{.LogPath}}' $cont_id | xargs sudo ls -hl | awk '{ print $5 }') && echo "$cont_name ($cont_id): $cont_size"; done
```

### Pre
```
docker network create conference-net
```

### Front
```
docker build -t alexyushchenk/conference-front:latest --build-arg VITE_API_URL=https://localhost:8001/api .
(--progress=plain --no-cache)
docker run -d -p 80:80 --name front alexyushchenk/conference-front
docker stop front
docker network connect conference-net front
docker start front
```

### DB
```
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=StrongPassword!23" --name sqlserver -v sqlvolume:/var/opt/mssql -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
docker stop sqlserver
docker network connect conference-net sqlserver
docker start sqlserver

docker exec -it sqlserver "bash"
./opt/mssql-tools/bin/sqlcmd -S localhost -U SA
```

### Back
```
docker build -t alexyushchenk/conference-back:latest .
docker run -d --name back -p 8000:8000 -v back-vol:/app alexyushchenk/conference-back

fix /var/lib/docker/volumes/back-vol/_data/appsettings.json

docker network connect conference-net back
docker start back
```