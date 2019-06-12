FROM nginx
MAINTAINER Preston Lee
WORKDIR /usr/share/nginx/html
COPY ./dist/marketplace-ui ./

# RUN echo "{\"server\": \"$MARKETPLACE_SERVER_URL\"}" ./
