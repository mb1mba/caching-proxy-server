import { parseArguments } from "./utils/parseArguments.ts";

function main(inputArgs: string[]): void {
  parseArguments(inputArgs);
}

main(Deno.args);
