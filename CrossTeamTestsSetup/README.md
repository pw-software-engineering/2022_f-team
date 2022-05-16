### Prerequisite

All commands below should be run in bash command line.
Make sure you have docker and docker-compose installed.

```
docker -v
docker-compose -v
```

### Add env variables and login

```
export SP_APP_ID={See Teams post Wolszakiewicz Piotr 22.04 20:12}
export ACR_NAME="powoeuwcrossteamacr"
export SP_PASSWD={See Teams post Wolszakiewicz Piotr 22.04 20:12}
```

```
docker login $ACR_NAME.azurecr.io --username $SP_APP_ID --password $SP_PASSWD
```

### run docker-compose

run docker-compose from this readme directory

```
docker-compose -f ./TeamD/docker-compose.yml up
docker-compose -f ./TeamE/docker-compose.yml up
docker-compose -f ./TeamF/docker-compose.yml up
```

or go to /Team{D,E,F} and run

```
docker-compose up
```

This step will create 2 containers:

- sql-server container
- team{d,e,f} api container

### run cross-team tests

Make sure that both containers works in docker desktop.

go to directory with CrossTeamTests

```
cd {repository directory}/2022_f-team/Backend/CateringBackend.CrossTests/
```

TeamD

```
export CateringUrl="http://localhost:5000"
dotnet test
unset CateringUrl
```

TeamE

```
export CateringUrl="http://localhost:5012"
dotnet test
unset CateringUrl
```

TeamF

```
export CateringUrl="http://localhost:5012"
dotnet test
unset CateringUrl
```
