# Step 1: Use a newer Node.js version that supports structuredClone
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all source files
COPY . .

# Step 5: Build the app
RUN npm run build

# Step 6: Use Nginx to serve the app
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html/todolistapp

#Step 7 : Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
