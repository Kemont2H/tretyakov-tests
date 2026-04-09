export class HeaderComponent {
    constructor(page) {
      this.page = page;
      
      // Кнопка поиска в шапке
      this.searchIcon = page.locator('.header-top__actions-link[aria-label="Поиск"]');
      
      // Поле ввода в popup (только на главной странице)
      this.popupSearchInput = page.locator('.popup-search__input');
      
      // Поле ввода на странице результатов (если мы уже на странице поиска)
      this.resultsPageSearchInput = page.locator('input[name="query"], .search-group__input, input[placeholder="Что вы ищете?"]');
      
      // Кнопка отправки на странице результатов
      this.resultsPageSearchButton = page.locator('.search-group__btn, button[aria-label="Поиск"]');
    }
  
    /**
     * Проверяем, находимся ли мы на странице поиска
     */
    async isOnSearchPage() {
      const url = this.page.url();
      return url.includes('/search');
    }
  
    /**
     * Выполняет поиск по запросу
     * @param {string} query - что ищем
     */
    async searchFor(query) {
      console.log(`\n Поиск: "${query}"`);
      
      // Проверяем, на какой странице мы находимся
      const isSearchPage = await this.isOnSearchPage();
      
      if (isSearchPage) {
        // Мы на странице результатов - используем поиск на этой странице
        console.log('  На странице результатов, используем поиск на странице');
        
        // Находим поле ввода на странице результатов
        const searchInput = this.resultsPageSearchInput.first();
        await searchInput.waitFor({ state: 'visible', timeout: 5000 });
        
        // Очищаем и вводим новый запрос
        await searchInput.clear();
        await searchInput.fill(query);
        console.log(`  Введено: "${query}"`);
        
        await this.page.waitForTimeout(300);
        
        // Нажимаем Enter или кнопку поиска
        await searchInput.press('Enter');
        
      } else {
        // Мы на главной или другой странице - используем popup
        console.log('  На главной странице, открываем popup');
        
        // Нажимаем на лупу
        await this.searchIcon.click();
        
        // Ждем появления popup с полем ввода
        await this.popupSearchInput.waitFor({ state: 'visible', timeout: 5000 });
        console.log('  Форма поиска открыта');
        
        // Очищаем и вводим текст
        await this.popupSearchInput.clear();
        await this.popupSearchInput.fill(query);
        console.log(`  Введено: "${query}"`);
        
        await this.page.waitForTimeout(300);
        
        // Нажимаем Enter
        await this.popupSearchInput.press('Enter');
      }
      
      // Ждем загрузки результатов
      console.log('  Ожидаем загрузки результатов...');
      
      try {
        await this.page.waitForURL(
          url => url.includes('/search') && url.includes(encodeURIComponent(query)),
          { timeout: 10000 }
        );
        console.log('  URL обновился с новым запросом');
      } catch (error) {
        console.log('  URL не обновился, но продолжаем');
      }
      
      await this.page.waitForTimeout(2000);
      console.log(`Поиск "${query}" завершен\n`);
    }
  }