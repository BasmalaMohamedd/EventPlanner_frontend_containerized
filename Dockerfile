# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app for production
RUN npm run build

# ---------- Serve Stage ----------
FROM nginx:alpine

# Remove default Nginx static files (optional but clean)
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (OpenShift route will map this)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]