# Stage 1: Base image
FROM node:18-alpine AS base

# Install libc6-compat for Alpine Linux
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Stage 2: Install dependencies only when needed
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then \
    yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm i --frozen-lockfile; \
  else \
    echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Añadir un comando para listar archivos y verificar que todo esté presente
RUN ls -la

# Comando de construcción con más verbosidad para mejor depuración
RUN \
  if [ -f yarn.lock ]; then \
    yarn run build --verbose; \
  elif [ -f package-lock.json ]; then \
    npm run build --verbose; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm run build --reporter=default; \
  else \
    echo "Lockfile not found." && exit 1; \
  fi

# Stage 4: Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create user and group for running Next.js app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs

# Copy public directory
COPY --from=builder /app/public ./public

# Set correct permissions for Next.js app files
RUN mkdir .next && \
    chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Start the Next.js server
CMD ["node", ".next/server/server.js"]