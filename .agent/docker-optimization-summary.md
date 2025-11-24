# Docker Image Optimization Summary

## Overview

Applied optimizations from Julien Lengrand's tutorials to reduce Docker image sizes for all backend microservices:

- `apps/backend/api-gateway`
- `apps/backend/authentication-service`
- `apps/backend/identity-service`

## Key Optimizations Applied

### 1. **Node-Prune Integration** 🧹

- **What**: Installed and ran `node-prune` to remove unnecessary files from `node_modules`
- **Impact**: Removes test files, documentation, TypeScript definitions, and other clutter
- **Implementation**:
  ```dockerfile
  RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin && \
      node-prune
  ```
- **Expected Savings**: 20-30% reduction in `node_modules` size

### 2. **Production Dependencies Pruning** 📦

- **What**: Run `pnpm prune --prod` after building to remove all dev dependencies
- **Impact**: Eliminates TypeScript, testing frameworks, build tools from production image
- **Implementation**:
  ```dockerfile
  RUN pnpm prune --prod
  ```
- **Expected Savings**: 30-40% reduction in dependencies

### 3. **Optimized Runner Stage** 🏃

- **What**: Simplified the production runner stage to use minimal Alpine base
- **Changes**:
  - Removed the separate `prod-deps` stage (consolidation)
  - Only install essential runtime dependencies (`openssl` only)
  - Copy only: `node_modules` (pruned), `dist/`, and `package.json`
- **Impact**: Smaller final image with fewer layers
- **Expected Savings**: 10-20% additional reduction

### 4. **Selective File Copying** 📋

- **What**: Only copy essential files to the runner stage
- **Files Copied**:
  - `/node_modules` (already pruned and cleaned)
  - `/dist` (built application)
  - `package.json` (runtime metadata only)
- **Impact**: No unnecessary source code, tests, or build artifacts in production

## Before vs After Architecture

### Before:

```
STAGE 1: base (node:22-alpine + turbo + pnpm)
STAGE 2: builder (prune monorepo)
STAGE 3: installer (install all deps + build)
STAGE 4: development (for local dev)
STAGE 5: prod-deps (separate prod install)  ← Removed
STAGE 6: runner (copy from prod-deps)
```

### After:

```
STAGE 1: base (node:22-alpine + turbo + pnpm)
STAGE 2: builder (prune monorepo)
STAGE 3: installer (install + build + prune + node-prune)  ← Enhanced
STAGE 4: development (unchanged)
STAGE 5: runner (optimized, copy from installer)  ← Simplified
```

## Expected Results

Based on the tutorials, you should see:

- **Initial size**: ~400-500MB per service
- **After optimizations**: ~200-300MB per service
- **Total reduction**: 40-50% smaller images

### Breakdown of Savings:

1. Using Alpine already saves ~1GB vs standard Node image ✅ (already had this)
2. Multi-stage build saves ~50% ✅ (already had this)
3. `pnpm prune --prod` saves ~30-40% of dependencies ✅ **NEW**
4. `node-prune` saves ~20-30% more from remaining modules ✅ **NEW**
5. Selective copying prevents bloat ✅ **IMPROVED**

## Further Optimization Options (Not Applied)

### Docker Squash

- **What**: `docker build --squash` merges all layers
- **Pros**: Additional 10-15% size reduction
- **Cons**:
  - Loses layer caching benefits
  - Can't reuse base layers across services
  - One-way operation
- **Recommendation**: Skip for now (you have 3 services sharing layers)

### Docker-Slim

- **What**: Automated container minification tool
- **Expected Savings**: Can reduce to ~100MB (70% reduction)
- **Cons**:
  - Requires manual testing after
  - May break dynamic imports
  - Adds complexity to CI/CD
- **Recommendation**: Test manually first before CI integration

## Testing the Optimizations

To verify the improvements, build one service and check the size:

```bash
# Build a production image
docker build -f apps/backend/api-gateway/Dockerfile \
  --target runner \
  -t curator/api-gateway:latest .

# Check the size
docker images curator/api-gateway:latest

# Inspect layers
docker history curator/api-gateway:latest
```

## Next Steps

1. ✅ **Modified all 3 Dockerfiles** with optimizations
2. 🔄 **Test build** one service to verify it works
3. 📊 **Measure sizes** before/after
4. 🚀 **Deploy** if tests pass
5. 📝 **Document** actual size reductions achieved

## References

- [Tutorial 1: Reducing Docker's image size](https://lengrand.fr/reducing-dockers-image-size-while-creating-an-offline-version-of-carbon-now-sh/)
- [Tutorial 2: Reducing image size further](https://lengrand.fr/reducing-our-docker-image-size-further/)
- [node-prune](https://github.com/tj/node-prune)
- [Docker multi-stage builds](https://docs.docker.com/build/building/multi-stage/)
