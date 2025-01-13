import { startServer } from "./server.ts";
import { parseArguments } from "./utils/parseArguments.ts";
import { clearCache } from "./redis/empty.ts";

async function main(inputArgs: string[]): Promise<void> {
  const parsedArgs = parseArguments(inputArgs);

  if ("clear-cache" in parsedArgs) {
    console.log("🧹 Clearing cache...");
    await clearCache();
    console.log("✅ Cache cleared successfully.");
    Deno.exit(0);
  }

  startServer(parsedArgs.port, parsedArgs.origin);
}

main(Deno.args);
