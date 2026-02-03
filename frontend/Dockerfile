# --- Build Stage ---
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:stable-alpine
# Copy build files to Nginx web root
COPY --from=build-stage /app/build /usr/share/nginx/html`
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]