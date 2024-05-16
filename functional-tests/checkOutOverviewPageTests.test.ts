import { test } from "../fixtures/aiFixture.ts";
import { TestPage } from "../pageObjects/pages/testPage.ts";
import { expect } from "@playwright/test";

const item1 = TestPage.items[0];
const item2 = TestPage.items[1];

test.beforeEach(async ({ ai }) => {
  await ai(`Navigate to ${TestPage.url}`);
  await ai(
    `Log in as user with login ${TestPage.accounts[0].login} password ${TestPage.accounts[0].password}`
  );
  await ai("Click login button");
  await ai(`Add ${item1.test_case} and ${item2.test_case} items to cart`);
  await ai("Navigate to cart page");
  await ai("Click checkout button");
});

test("Verify added items on Checkout Overview page ", async ({ ai }) => {
  let expectedItemPrice1 = Number(item1.item_price);
  let expectedItemPrice2 = Number(item2.item_price);
  let taxPriceValue = 3.2;

  let itemsTotalPriceExpected = `$ ${expectedItemPrice1 + expectedItemPrice2}`;
  let taxPriceExpected = `$ ${taxPriceValue}`;
  let totalPriceExpected = `$ ${
    expectedItemPrice1 + expectedItemPrice2 + taxPriceValue
  }`;

  await ai(
    "Proceed with checkout with First Name John, Last Name Doe, Zip Code 12345"
  );

  const itemsCount = await ai("Get count of items on the page");
  const itemPrice = await ai("Get Item total price");
  const taxPrice = await ai("Get Tax price");
  const totalItemPrice = await ai("Get Total price");

  expect(Number(itemsCount)).toEqual(2);
  expect(itemPrice).toEqual(itemsTotalPriceExpected);
  expect(taxPrice).toEqual(taxPriceExpected);
  expect(totalItemPrice).toEqual(totalPriceExpected);
  expect(Number(await ai("Get number from cart badge"))).toEqual(2);
});
