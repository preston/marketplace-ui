FROM nginx
MAINTAINER Preston Lee
WORKDIR /usr/share/nginx/html
COPY ./build ./

# RUN echo "{\"server\": \"$MARKETPLACE_SERVER_URL\"}" ./
