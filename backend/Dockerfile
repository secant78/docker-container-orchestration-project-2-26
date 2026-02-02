# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# If using TypeScript, run: RUN npm run build

# --- Production Stage ---
FROM node:20-alpine
WORKDIR /app

# Security: Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app .

EXPOSE 3000

# Healthcheck to ensure API is responding
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]