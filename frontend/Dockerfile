# Step 1: Use Node.js as the base image
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest the application
COPY . .

# Step 6: Build frontend application
RUN npm run build

# Step 7: Use Alpine to reduce container size
FROM alpine:latest
WORKDIR /app
RUN apk add --no-cache python3 py3-pip

# Step 8: Copy build file to /app
COPY --from=build /app/dist .

# Step 9: Use python SimpleHTTPServer 
CMD ["python3", "-m", "http.server", "8080"]
EXPOSE 8080