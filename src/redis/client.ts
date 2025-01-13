import { createClient, RedisClientType } from "npm:redis@^4.5";

let client: RedisClientType | null = null;

export async function connectToRedis(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      url: "redis://127.0.0.1:6379",
    });

    client.on("error", (err: Error) => console.log("Redis Client Error", err));

    console.log("🔄 Attempting to connect to Redis...");
    await client.connect();
    console.log("✅ Successfully connected to Redis");
  }

  return client;
}
