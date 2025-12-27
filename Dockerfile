# Stage 1: Build the Vite app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:stable-alpine AS production
# OpenShift runs containers as arbitrary non-root user, so we need to adjust permissions
RUN chmod -R 755 /usr/share/nginx/html && chown -R nginx:nginx /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
# OpenShift expects the app to listen on port 8080 by default
ENV PORT=8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]