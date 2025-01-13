import { Args } from "https://deno.land/std@0.200.0/flags/mod.ts";

export function handleArgsError(parsedArgs: Args): void {
  if ("clear-cache" in parsedArgs) {
    return;
  }

  if (!parsedArgs.origin) {
    console.error(
      "[Error]: The 'origin' argument is required. Please provide it using '--origin http://your-origin.com'."
    );
    Deno.exit(1);
  }

  if (!parsedArgs.port) {
    console.error(
      "[Error]: The 'port' argument is required. Please provide it using '--port 8080'."
    );
    Deno.exit(1);
  }
}
