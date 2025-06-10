# 1. Base image (Node 18 LTS, Alpine variant)
FROM node:18-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package descriptor files first (better layer-cache)
COPY package*.json ./

# 4. Install production dependencies only
RUN npm ci --omit=dev

# 5. Copy the rest of the source code
COPY . .

# 6. Expose the Express port
EXPOSE 5000

# 7. Start the API
CMD ["node", "server.js"]
