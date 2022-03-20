from node:lts-alpine as builder

WORKDIR /app
COPY package.json .

RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]