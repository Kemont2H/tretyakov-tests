import { test } from '@playwright/test';
import { HomePage } from '../pages/Home.page.js';
import { SearchResultsPage } from '../pages/SearchResults.page.js';

test.describe('Тестирование поиска на сайте Третьяковской галереи', () => {
  
  test('Повторное использование поиска - Пушкин -> Италия', async ({ page }) => {
    console.log('\n' + '='.repeat(60));
    console.log('Повторное использование поиска');
    console.log('='.repeat(60));
    
    console.log('\nОткрытие главной страницы');
    const homePage = new HomePage(page);
    await homePage.goto();
    
    console.log('\nПоиск "Пушкин"');
    await homePage.header.searchFor('Пушкин');
    
    console.log('\nПроверка результатов для "Пушкин"');
    const searchPage = new SearchResultsPage(page);
    await searchPage.assertUrlContainsQuery('Пушкин');
    await searchPage.assertResultsContainText('Пушкин');
    
    await page.waitForTimeout(1000);
    
    console.log('\nПоиск "Италия" (второй поиск)');
    await searchPage.header.searchFor('Италия');
    
    console.log('\nПроверка результатов для "Италия"');
    await searchPage.assertUrlContainsQuery('Италия');
    await searchPage.assertResultsContainText('Италия');
    
    console.log('\n' + '='.repeat(60));
    console.log('ТЕСТ ПРОЙДЕН');
    console.log('='.repeat(60) + '\n');
  });
});