# Install dependencies only when needed
FROM node:18-alpine as dependencies

# The `libc6-compat` package is a compatibility package that provides the necessary libraries
# for programs that were compiled for a newer version of Linux.
#This package is needed because the Alpine Linux kernel is based on a very old version of Linux.
# For ensure Docker image be able to run programs compiled for a newer version of Linux.
# Ensure image compatibility with a wide range of applications .
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

COPY --chown=node:node ./next-template/package*.json ./
# RUN yarn install --frozen-lockfile
RUN npm install --only=production

# Rebuild the source code only when needed
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY --chown=node:node ./next-template .

COPY --chown=node:node --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine as runner

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY --chown=node:node --from=builder /usr/src/app/public ./public

COPY --chown=node:node --from=builder /usr/src/app/package.json ./package.json

COPY --chown=node:node --from=builder /usr/src/app/.next ./.next

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

# EXPOSE 3001

CMD ["npm", "start"]