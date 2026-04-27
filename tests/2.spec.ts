import { test, expect } from '@playwright/test';

test('Поиск ролевых селекторов', async ({ page }) => {
  await page.goto(
    'file:///C:/Users/julia/Documents/Code%20Study%20Projects/qa_guru_test_project/burger-order.html',
  );
  await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('тест');
  await page.getByRole('combobox', { name: 'Тип бургера:' }).selectOption('Чизбургер');
  await page.getByRole('radio', { name: 'Большой' }).click();
  await page.getByRole('checkbox', { name: 'Горчица' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).click();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await expect(page.getByRole('heading', { name: 'Заказ принят!' })).toBeVisible();
  await expect(page.getByRole('paragraph', { name: /Спасибо за заказ, тест!/ })).toBeVisible();
  //   await page.getByRole('checkbox', { name: 'Да' }).click();
});

test.only('Поиск селекторов по классу', async ({ page }) => {
  await page.goto(
    'file:///C:/Users/julia/Documents/Code%20Study%20Projects/qa_guru_test_project/burger-order.html',
  );
  await page.locator('.order-form').locator('.form-group').locator('input').first().fill('test');
  await page.locator('.order-form').locator('select').first().selectOption('cheeseburger');
  await page.locator('.radio-group').filter({ hasText: 'Большой' }).click();
  await page.locator('.checkbox-group').filter({ hasText: 'Горчица' }).click();
  await page.locator('.checkbox-group').click();
  await page.locator('.checkbox-group').filter({ hasText: 'Горчица' }).click();
});
