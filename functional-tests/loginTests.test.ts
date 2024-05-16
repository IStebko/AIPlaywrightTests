import { test } from "../fixtures/aiFixture.ts";
import { TestPage } from "../pageObjects/pages/testPage.ts";
import { expect } from "@playwright/test";

test.beforeEach(async ({ ai }) => {
  await ai(`Navigate to ${TestPage.url}`);
});

test("Verify user log out", async ({ ai }) => {
  await ai(
    `Log in as user with login ${TestPage.accounts[0].login} password ${TestPage.accounts[0].password}`
  );
  await ai("Click login button");
  await ai("Open sidebar");
  await ai("Log out");

  expect(await ai("Get login button text")).toEqual("Login");
});
