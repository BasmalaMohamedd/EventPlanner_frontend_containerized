FROM node:18

 # Set the working directory inside the container
 WORKDIR /app

 # Copy package.json and package-lock.json to install dependencies
 COPY package*.json ./

 # Install dependencies
 RUN npm install

 # Copy the rest of the application code
 COPY . .

 # Build the Vite app for production
 RUN npm run build

 # Install serve globally to serve the production build
 RUN npm install -g serve

 # Expose port 8080 (OpenShift expects this port)
 EXPOSE 8080

 # Start the app using serve
 CMD ["serve", "-s", "dist", "-p", "8080"]
