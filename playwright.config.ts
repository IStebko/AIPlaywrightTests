import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "functional-tests",
  fullyParallel: true,
  reporter: "html",
  expect: {
    timeout: 5000,
  },
  use: {
    trace: "on-first-retry",
    headless: true
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
