## build stage

# 去 DockerHub 借用 official 嘅 node image：https://hub.docker.com/_/node/
FROM node:lts-alpine as build-stage

# set working directory，參考：https://www.educative.io/edpresso/what-is-the-workdir-command-in-docker
WORKDIR /app

# install and cache app dependencies，然後 build file-agent
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

## production stage，攞隻 nginx image
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
# 參考：https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting/18861312

## Now let’s build the Docker image of file-agent app:
#  docker build -t file-agent-img .

## Finally, let’s run file-agent app in a Docker container:
#  docker run -it -p 8001:80 --rm --name file-agent file-agent-img
