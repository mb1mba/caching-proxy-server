import { Application } from "https://deno.land/x/oak@v17.1.4/mod.ts";
import { createRouter } from "./router/createRouter.ts";

export async function startServer() {
  const router = createRouter();

  const application = new Application();
  application.use(router.routes());
  application.use(router.allowedMethods());

  await application.listen({ port: 3000, hostname: "127.0.0.1" });
}
