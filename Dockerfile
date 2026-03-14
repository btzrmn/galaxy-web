# ---- Build Stage ----
FROM node:22-slim AS build

WORKDIR /app

# package.json + package-lock.json эхэлж хуулна
COPY package*.json ./

# БҮРЭН dependencies (devDependencies орно)
RUN npm install

# source code хуулна
COPY . .

# build хийх
RUN npm run build

# ---- Production Stage ----
FROM nginx:stable-alpine AS production

COPY --from=build /app/dist/galaxy-web /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]