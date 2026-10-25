# Step 1: Build the React Frontend

FROM node:20-alpine AS frontend-builder
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Step 2: Set up the Express Backend
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Copy the compiled production build from Step 1 into your backend scope
# This assumes your index.js looks for '../client/build' or './client/build'
COPY --from=frontend-builder /client/build ./client/build

EXPOSE 4000
CMD ["node", "index.js"]