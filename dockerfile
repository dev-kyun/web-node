FROM node:20.5-bullseye AS node-base
WORKDIR ./web-node
COPY .yarnrc.yml yarn.lock .pnp.cjs .pnp.loader.mjs package.json tsconfig.json tsconfig.eslint.json ./
COPY .yarn ./.yarn
COPY packages ./packages


FROM node-base AS server

COPY projects/console-server ./projects/console-server
RUN yarn run newbie:cicd
RUN yarn run build
COPY ./shells/server-entrypoint.sh ./server-entrypoint.sh

EXPOSE 4001

ENTRYPOINT ["sh" ,"-c", "./console-server-entrypoint.sh"]


