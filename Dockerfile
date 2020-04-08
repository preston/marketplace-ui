FROM node:13-alpine as builder
LABEL maintainer="preston.lee@prestonlee.com"

# Install dependencies first so they layer can be cached across builds.
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

# Build
COPY . .
RUN npm run ng build --production
#  -- --prod

FROM nginx:latest
# Copy our default nginx config
# COPY nginx/default.conf /etc/nginx/conf.d/

# Remove any default nginx content
RUN rm -rf /usr/share/nginx/html/*

## Copy build from "builder" stage, as well as runtime configuration script public folder
COPY --from=builder /app/dist/marketplace-ui /usr/share/nginx/html
COPY --from=builder /app/configure-from-environment.sh /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# CMD ["./configure-from-environment.sh", "&&", "exec", "nginx", "-g", "'daemon off;'"]
CMD /usr/share/nginx/html/configure-from-environment.sh && exec nginx -g 'daemon off;'
# ENTRYPOINT ["./configure-from-environment.sh"]
# CMD ["nginx", "-g", "daemon off;"]
