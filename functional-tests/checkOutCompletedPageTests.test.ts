import { TestPage } from "../pageObjects/pages/testPage.ts";
import { test } from "../fixtures/aiFixture.ts";
import { expect } from "@playwright/test";

const itemOrder = TestPage.items[0].test_case;

test.beforeEach(async ({ ai }) => {
  await ai(`Navigate to ${TestPage.url}`);
  await ai(
    `Log in as user with login ${TestPage.accounts[0].login} password ${TestPage.accounts[0].password}`
  );
  await ai("Click login button");
  await ai(`Add ${itemOrder} item to cart`);
  await ai("Navigate to cart page");
  await ai("Click checkout button");
  await ai(
    "Proceed with checkout with First Name John, Last Name Doe, Zip Code 12345"
  );
});

test("Verify proceeding from Checkout Overview Page to Checkout Completed Page", async ({
  ai,
}) => {
  await ai("Click Finish button");
  const pageTitle = await ai("Get title of the page");

  expect(pageTitle).toEqual("Checkout: Complete!");
});
