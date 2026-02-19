import { readFileSync, writeFileSync } from "fs";

const file = "src/server.ts";
const content = readFileSync(file, "utf8");
writeFileSync(file, content.replace(/@\//g, "./"));
