# Step 1: Temporary build stage for React
FROM node:20-alpine AS build-env
WORKDIR /build
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client/ ./client/
RUN cd client && npm run build

# Step 2: Tiny runtime environment for Express
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Extract ONLY the raw static text assets from Step 1
COPY --from=build-env /build/client/dist ./client/dist

EXPOSE 4000
CMD ["node", "index.js"]
