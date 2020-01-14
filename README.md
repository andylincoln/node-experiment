# flask-experiment


## Getting Started
Clone this repo and run these commands
```
docker-compose up -d database
psql -h database -U postgres -f init.sql
```

## Back End

### Adding Python Dependencies
```sh
docker-compose run todo poetry add <dependency-name>
```

### Running the tests
```sh
docker-compose run test
```

## Front End 

### Build the front end
```sh
yarn build
```

### Watch the front end build
```sh
yarn watch
```
