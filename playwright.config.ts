import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Specify the directory containing your tests
  use: {
    baseURL: 'http://localhost:5173', // Replace with your app URL
    browserName: 'chromium', // or 'firefox', 'webkit'
    headless: true, // Run tests in headless mode
  },
});
