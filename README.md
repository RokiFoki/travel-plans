## Installation & Running
install node
https://nodejs.org/en/download/

install dependencies 
```
npm install
```

install postgres and create a database called `travel_plans`
alternativelly, you can change `config.ts` and `database.ts` and use another database supported by knex

run migrations to update database (you will need knex installed globally): 
```
knex migrate:latest
```

start server
```
npm start
```

## Stack
- Angular 9 with rxjs
- NodeJs with express
- Knex as query builder + migrations
- postgres




