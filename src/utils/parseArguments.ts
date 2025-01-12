import { parse } from "https://deno.land/std@0.200.0/flags/mod.ts";
import type { Args } from "https://deno.land/std@0.200.0/flags/mod.ts";
import { handleArgsError } from "../errors/handleArgsError.ts";

export function parseArguments(args: string[]): Args {
  const stringArgs = ["origin", "port"];
  const alias = {
    port: "p",
  };

  const parsedArgs = parse(args, {
    alias,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });

  handleArgsError(parsedArgs);

  return parsedArgs;
}
