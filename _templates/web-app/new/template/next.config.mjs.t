---
to: apps/frontend/<%=name%>/next.config.mjs
---
import config from "@repo/ui-web/next.config";

const nextConfig = {
  ...config
};

export default nextConfig;
