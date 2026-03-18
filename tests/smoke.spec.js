const { test, expect } = require('@playwright/test');
const path = require('path');

test('deve carregar a página inicial corretamente', async ({ page }) => {
  // Carrega o arquivo index.html localmente
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
  await page.goto(filePath);

  // Valida o título da página
  await expect(page).toHaveTitle(/Virtus Solutions/);

  // Valida se o nome da empresa está visível na logo
  const logo = page.locator('.logo');
  await expect(logo).toContainText('Virtus Solutions');
});

test('deve alternar o idioma para inglês', async ({ page }) => {
  const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
  await page.goto(filePath);

  // Seleciona o switch de idioma
  await page.selectOption('#lang-switch', 'en');

  // Verifica se o texto do botão hero mudou para inglês
  const heroBtn = page.locator('.btn');
  await expect(heroBtn).toContainText('Get a Free Diagnosis');
});
