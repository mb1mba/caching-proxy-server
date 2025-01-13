import { Router } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { connectToRedis } from "../redis/client.ts";

export function createRouter(origin: string) {
  const router = new Router();

  router.get("(.*)", async (ctx) => {
    const path = ctx.request.url.pathname;
    const url = `${origin}${path}`;

    const response = await fetch(url);
    const products = await response.json();

    const client = await connectToRedis();
    const cacheKey = ctx.request.url.pathname;

    const cachedProducts = await client.get(cacheKey);

    if (!cachedProducts) {
      await client.set(cacheKey, JSON.stringify(products));
      await client.quit();
    }

    ctx.response.status = 200;
    ctx.response.body = { success: true, data: products };
    ctx.response.headers.append("X-Cache", "MISS");
  });

  return router;
}
