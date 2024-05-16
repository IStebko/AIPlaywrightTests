import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export function readFromCsv(filepath: string, filename: string) {
  const records = parse(fs.readFileSync(path.join(filepath, filename)), {
    columns: true,
    skip_empty_lines: true,
    autoParse: true,
  });
  return records;
}
