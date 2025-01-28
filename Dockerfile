FROM oven/bun:1 AS base

WORKDIR /app

COPY . .

RUN bun i --production --ignore-scripts --frozen-lockfile

EXPOSE 5173

CMD PORT=5173 HOSTNAME=0.0.0.0 bun server.js