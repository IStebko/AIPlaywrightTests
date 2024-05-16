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
});

test.describe
  .parallel("Verify unavailability to checkout with invalid data entered", () => {
  const invalidCredentials = [
    {
      testName: "empty Zip Code",
      firstName: "John",
      lastName: "Doe",
      zipCode: "empty",
      errorMessage: "Postal Code",
    },
    {
      testName: "empty Last Name",
      firstName: "John",
      lastName: "empty",
      zipCode: "12345",
      errorMessage: "Last Name",
    },
    {
      testName: "empty First Name",
      firstName: "empty",
      lastName: "Doe",
      zipCode: "12345",
      errorMessage: "First Name",
    },
  ];
  for (const credential of invalidCredentials) {
    test(`Verify checkout for user with ${credential.testName}`, async ({
      ai,
    }) => {
      await ai(
        `Proceed with checkout with First Name ${credential.firstName}, Last Name ${credential.lastName}, Zip Code ${credential.zipCode}`
      );
      const errorText = await ai("Get error text");

      expect(errorText).toEqual(
        `Error: ${credential.errorMessage} is required`
      );
    });
  }
});
