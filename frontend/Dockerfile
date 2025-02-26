# ใช้ Node.js สำหรับ Build React
FROM node:18 AS build
WORKDIR /app

# คัดลอกไฟล์และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด และ build frontend
COPY . .
RUN npm run build

# ใช้ Alpine เพื่อลดขนาดของ container
FROM alpine:latest
WORKDIR /app
RUN apk add --no-cache python3 py3-pip

# คัดลอกไฟล์ที่ build เสร็จมาไว้ที่ /app
COPY --from=build /app/dist /app

# ใช้ Python SimpleHTTPServer แทน Nginx
CMD ["python3", "-m", "http.server", "8080"]
EXPOSE 8080
