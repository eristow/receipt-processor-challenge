FROM node:22-alpine3.21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY . ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
RUN apk --no-cache add curl

FROM base AS final
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN apk --no-cache add curl
HEALTHCHECK --interval=30s --timeout=30s --retries=5 --start-period=3s \
	CMD curl -f http://localhost:3000/health
EXPOSE 3000
CMD ["pnpm", "start"]
