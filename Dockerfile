FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn install

# CMD ["yarn", "start", "nextjs-client"]

# Base image for production
# FROM node:15.2.4 As build

# ... your build instructions here

###################
# PRODUCTION
###################

# Base image for production
# FROM node:15.2.4 As production

# ... your production instructions here