FROM node:15-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app
RUN yarn build

FROM node:15-alpine
RUN yarn global add serve
COPY --from=build /app/build /app/build

CMD serve -p 3001 -s /app/build
