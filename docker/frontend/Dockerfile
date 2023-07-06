# Install dependencies only when needed
FROM node:18-alpine As dependencies

# The `libc6-compat` package is a compatibility package that provides the necessary libraries
# for programs that were compiled for a newer version of Linux.
# This package is needed because the Alpine Linux kernel is based on a very old version of Linux.
# For ensure Docker image be able to run programs compiled for a newer version of Linux.
# Ensure image compatibility with a wide range of applications .
RUN apk add --no-cache libc6-compat vim

WORKDIR /usr/src/app

RUN npm install -g npm@latest

RUN chown -R node:node /usr/src/app

COPY --chown=node:node ./next-template/package*.json ./
# RUN yarn install --frozen-lockfile
# COPY --chown=node:node ./next-template .

RUN npm install --production

# Rebuild the source code only when needed
FROM node:18-alpine As builder

RUN apk add --no-cache libc6-compat vim

WORKDIR /usr/src/app

RUN npm install -g npm@latest

COPY --chown=node:node --from=dependencies /usr/src/app/node_modules ./node_modules

COPY --chown=node:node ./next-template .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine As other

RUN apk add --no-cache libc6-compat vim

WORKDIR /usr/src/app

RUN npm install -g npm@latest

COPY --chown=node:node ./next-template .

COPY --chown=node:node --from=builder /usr/src/app/public ./public

COPY --chown=node:node --from=builder /usr/src/app/package.json ./package.json

COPY --chown=node:node --from=builder /usr/src/app/.next ./.next

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

USER node

# Production image, copy all the files and run next
FROM node:18-alpine As runner

RUN apk add --no-cache libc6-compat vim

WORKDIR /usr/src/app

RUN npm install -g npm@latest

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --chown=node:node --from=builder /usr/src/app/public ./public

COPY --chown=node:node --from=builder /usr/src/app/package.json ./package.json

COPY --chown=node:node --from=builder /usr/src/app/.next ./.next

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
# verify if this line is necessary !!!

USER node

EXPOSE 3001

CMD ["npm", "start"]
# CMD ["node", "server.js"]
# maybe better start value ??
