import fs from "fs";
import path from "path";
import { readFromCsv } from "../helpers/readFromCsv";

export class TestPage {
  private static readonly config = JSON.parse(
    fs.readFileSync(path.resolve("testConfig.json"), "utf8")
  );

  public static readonly accounts = readFromCsv("testData", "Accounts.csv");
  public static readonly items = readFromCsv("testData", "Products.csv");
  public static readonly url = TestPage.config.homePageUrl;
}
