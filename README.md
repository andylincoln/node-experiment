# flask-experiment


## Getting Started
Clone this repo and run these commands
```
docker-compose up -d database
psql -h database -U postgres -f init.sql
```

## Adding Python Dependencies
```sh
docker-compose run todo poetry add <dependency-name>
```

## Running the tests
```sh
docker-compose run test
```
