import { HeaderComponent } from './components/Header.component.js';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  async goto() {
    console.log('Открываем главную страницу...');
    await this.page.goto('https://www.tretyakovgallery.ru/?lang=ru');
    await this.page.waitForLoadState('networkidle');
    console.log('Главная страница загружена');
  }
}