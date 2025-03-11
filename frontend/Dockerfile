# Step 1: ใช้ Node.js สำหรับ Build
FROM node:18 AS build
WORKDIR /app

# Step 2: Copy package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# Step 3: คัดลอกโค้ดทั้งหมด และ Build Frontend
COPY . .
RUN npm run build

# Step 4: ใช้ Nginx เป็น Web Server
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Step 5: คัดลอกไฟล์ build ไปยัง Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Step 6: คัดลอก Nginx config ไปยัง container (ไม่จำเป็นถ้าใช้ `todolist` บน VM)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 7: เปิดพอร์ต 80
EXPOSE 80

# Step 8: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
