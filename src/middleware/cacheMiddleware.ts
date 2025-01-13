import { Middleware } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { connectToRedis } from "../redis/client.ts";

export const cacheMiddleware: Middleware = async (ctx, next): Promise<void> => {
  try {
    const client = await connectToRedis();

    const { pathname } = ctx.request.url;

    const cachedResponse = await client.get(pathname);

    if (cachedResponse) {
      ctx.response.body = cachedResponse;
      ctx.response.headers.append("X-Cache", "HIT");
      return;
    }

    await next();
  } catch (error) {
    console.error("Redis error:", error);
    ctx.response.headers.append("X-Cache", "MISS");
    await next();
  }
};
