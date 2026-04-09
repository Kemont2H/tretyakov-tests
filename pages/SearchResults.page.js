import { HeaderComponent } from './components/Header.component.js';

export class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.resultsContainer = page.locator('.search-results, .search-result, .result-item');
    this.noResultsMessage = page.locator('.not-found, .search-empty');
  }

  async assertUrlContainsQuery(expectedQuery) {
    console.log(`  Проверяем URL для "${expectedQuery}"`);
    const url = this.page.url();
    const encodedQuery = encodeURIComponent(expectedQuery);
    
    const hasQuery = url.includes(expectedQuery) || 
                     url.includes(encodedQuery) ||
                     url.includes(`query=${encodedQuery}`);
    
    if (!hasQuery) {
      throw new Error(`URL "${url}" не содержит "${expectedQuery}"`);
    }
    
    console.log(`  URL содержит "${expectedQuery}"`);
    console.log(`  Текущий URL: ${url}`);
  }

  async assertResultsContainText(text) {
    console.log(`  Проверяем наличие текста "${text}" на странице`);
    
    await this.page.waitForTimeout(1000);
    
    const bodyText = await this.page.textContent('body');
    
    if (!bodyText.includes(text)) {
      const preview = bodyText.substring(0, 500);
      console.log(`  Первые 500 символов:\n${preview}...`);
      throw new Error(`Текст "${text}" не найден на странице`);
    }
    
    console.log(`  Текст "${text}" найден на странице`);
  }
}