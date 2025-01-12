import { Router } from "https://deno.land/x/oak@v17.1.4/mod.ts";

export function createRouter() {
  const router = new Router();
  router.get("/api/products", async (context) => {
    const response = await fetch("http://dummyjson.com/products");
    const products = await response.json();
    context.response.status = 200;
    context.response.body = { success: true, data: products };
  });
  return router;
}
