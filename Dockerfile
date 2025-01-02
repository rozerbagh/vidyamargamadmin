# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json
COPY package-lock.json package-lock.json 
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 