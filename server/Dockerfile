FROM node:12-slim
WORKDIR /opt/todo
COPY package.json /opt/todo/package.json
COPY yarn.lock /opt/todo/yarn.lock
RUN yarn install
CMD ["yarn", "serve"]
