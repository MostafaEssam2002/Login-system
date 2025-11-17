# Use official Node.js LTS image
FROM node:18-alpine

# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application code
COPY . .

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
