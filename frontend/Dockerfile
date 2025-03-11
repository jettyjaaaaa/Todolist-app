# Step 1: Use Node.js as the base image
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build frontend application
RUN npm run build

# Step 7: Use Nginx as the final image
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Step 8: Remove default Nginx static files and copy build
RUN rm -rf ./*
COPY --from=build /app/dist .

# Step 9: Expose Nginx port
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
