# syntax=docker/dockerfile:1

# Use Node 20 slim base
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS build

LABEL fly_launch_runtime="Node.js"

# Set working directory
WORKDIR /app

# Install system dependencies (for native modules)
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
RUN npm install

# Copy the rest of the app
COPY . .

# (Optional) build Expo web version if you want static hosting
# RUN npx expo export:web

# ----- Runtime stage -----
FROM node:${NODE_VERSION}-slim AS runtime

WORKDIR /app

# Copy built app from previous stage
COPY --from=build /app /app

# Now set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Expose Fly.io port
EXPOSE 8080

# Start your Expo app
CMD ["npm", "run", "start"]
