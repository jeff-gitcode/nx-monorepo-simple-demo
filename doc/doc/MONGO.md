# MongoDB

## MongoDB Demo

![alt text](./mongo-demo.gif)

MongoDB is a document-oriented NoSQL database used for high volume data storage.

- Scale Cheaper
- Query Faster
- Pivot Easier
- Program Faster

## 1. Start MongoDB with Docker Compose

```bash
## Start MongoDB with Docker Compose
$ docker compose up -d
## verify container process is running
$ docker-compose ps
## verify mongo is running
$ mongosh
## verify db is running
> db.version()
```

## 2. Configure database connection URL

```bash
## Start MongoDB with Docker Compose
$ touch .env
## add database url
DATABASE_URL="mongodb://admin:password@localhost:27017/prisma-mongo?authSource=admin&retryWrites=true&w=majority"
```

## 3. Generate Prisma Client

```bash
## generate prisma client
$ npx prisma generate
```

[Back to DDD](./DDD.md)
