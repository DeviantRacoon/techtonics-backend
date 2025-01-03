FROM node:18-alpine AS base

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

COPY --from=base /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]