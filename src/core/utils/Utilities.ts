import * as fs from "fs";
import * as yaml from "js-yaml";

export function readFileYml(path: string) {
  try {
    const fileContent = fs.readFileSync(path, "utf8");
    return yaml.load(fileContent);
  } catch (e) {
    console.error(`Error reading YAML file: ${e}`);
    throw e;
  }
}
