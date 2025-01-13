import { connectToRedis } from "./client.ts";

export async function clearCache(): Promise<void> {
  const client = await connectToRedis();
  await client.FLUSHDB();
  await client.quit();
}
