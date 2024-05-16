import { expect } from "@playwright/test";
import { test } from "../fixtures/aiFixture.ts";
import { TestPage } from "../pageObjects/pages/testPage.ts";

enum SortOrder {
  nameAtoZ = "first",
  nameZtoA = "second",
  priceLowToHigh = "By price low to high",
  priceHighToLow = "By price high to low",
}

test.beforeEach(async ({ ai }) => {
  await ai(`Navigate to ${TestPage.url}`);
  await ai(
    `Log in as user with login ${TestPage.accounts[0].login} password ${TestPage.accounts[0].password}`
  );
  await ai("Click login button");
});

test.describe.parallel("Price sorting drop-down verification", () => {
  const testCases = [
    { sortingOption: SortOrder.priceLowToHigh },
    { sortingOption: SortOrder.priceHighToLow },
  ];

  for (const testCase of testCases) {
    test(`Verify sorting by item price ${testCase.sortingOption}`, async ({
      ai,
    }) => {
      await ai(
        `Select ${testCase.sortingOption} option from sorting drop-down`
      );
      const prices = await (await ai("Get all items prices"))
        .replace(/\$|\s/g, "")
        .split(",")
        .map(Number);
      let sortedPrices: Array<number> = [];
      switch (testCase.sortingOption) {
        case SortOrder.priceLowToHigh:
          sortedPrices = prices.slice().sort((a, b) => a - b);
          break;
        case SortOrder.priceHighToLow:
          sortedPrices = prices.slice().sort((a, b) => b - a);
          break;
      }

      expect(prices).toEqual(sortedPrices);
    });
  }
});

test.describe.parallel("Name sorting drop-down verification", () => {
  const testCases = [
    { sortingOption: SortOrder.nameAtoZ },
    { sortingOption: SortOrder.nameZtoA },
  ];

  for (const testCase of testCases) {
    test(`Verify sorting by item name with ${testCase.sortingOption} drop-down option`, async ({
      ai,
    }) => {
      await ai(
        `Select ${testCase.sortingOption} option from sorting drop-down`
      );
      const itemNames = (await ai("Get all items names split with comma"))
        .replace(/\s/g, "")
        .split(",");
      let sortedNames: Array<string> = [];
      switch (testCase.sortingOption) {
        case SortOrder.nameAtoZ:
          sortedNames = itemNames.slice().sort();
          break;
        case SortOrder.nameZtoA:
          sortedNames = itemNames.slice().sort((a, b) => b.localeCompare(a));
          break;
      }

      expect(itemNames).toEqual(sortedNames);
    });
  }
});
