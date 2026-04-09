// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Папка с тестами
  fullyParallel: true, // Запускать тесты параллельно
  reporter: [
    ['line'], // Простой отчет в консоль
    ['allure-playwright', { 
      outputFolder: 'allure-results', // Папка с результатами для Allure
      detail: true,
    }]
  ],
  use: {
    baseURL: 'https://www.tretyakovgallery.ru', // Базовый URL
    headless: true, // true - браузер не виден, false - виден (для отладки поставь false)
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // Скриншот только при падении
    video: 'retain-on-failure', // Видео при падении
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});