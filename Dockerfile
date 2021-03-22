FROM node:14

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build
RUN npm install -g serve

CMD [ "serve", "-s", "build", "-l", "3000"]

EXPOSE 3000
