import { Application } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { createRouter } from "./router/createRouter.ts";
import { cacheMiddleware } from "./middleware/cacheMiddleware.ts";

export async function startServer(port: number, origin: string): Promise<void> {
  const router = createRouter(origin);

  const application = new Application();

  application.use(cacheMiddleware);
  application.use(router.routes());
  application.use(router.allowedMethods());

  await application.listen({ port, hostname: "127.0.0.1" });
}
