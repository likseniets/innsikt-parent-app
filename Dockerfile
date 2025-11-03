# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS build

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment for web platform
ENV EXPO_USE_STATIC=web

# Build Expo for web using Metro
RUN npx expo export -p web

# ----- Runtime stage -----
FROM nginx:alpine AS runtime

# Copy built static files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Create nginx config for SPA routing
RUN echo 'server { \n\
    listen 8080; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
