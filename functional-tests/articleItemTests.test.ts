import { expect } from "@playwright/test";
import { TestPage } from "../pageObjects/pages/testPage.ts";
import { test } from "../fixtures/aiFixture.ts";

const itemOrder = TestPage.items[0].test_case;
const addedItemsCount = 1;

test.beforeEach(async ({ ai }) => {
  await ai(`Navigate to ${TestPage.url}`);
  await ai(
    `Log in as user with login ${TestPage.accounts[0].login} password ${TestPage.accounts[0].password}`
  );
  await ai("Click login button");
});

test("Verify adding item to cart from Articles page", async ({ ai }) => {
  await ai(`Add ${itemOrder} item to cart`);
  const articleTitle = await ai(`Get title of ${itemOrder} item`);
  await ai("Navigate to cart page");
  const cartArticle = await ai("Get title of the item in the cart");

  expect(Number(await ai("Get number from cart badge"))).toEqual(
    addedItemsCount
  );
  expect(Number(await ai("Get items count on the page"))).toEqual(
    addedItemsCount
  );
  expect(articleTitle).toEqual(cartArticle);
});
