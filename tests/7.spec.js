import { expect, test } from '@playwright/test';

const URL = 'https://realworld.qa.guru/';

test('Ассерты видимости', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('.article-preview')).toBeVisible();
  await expect(page.locator('.error')).toBeHidden();
});

test('Ассерты активности', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/#/login');
  await expect(page.locator('.btn')).toBeEnabled();
  await expect(page.getByRole('textbox', { name: 'Password' })).not.toBeDisabled();
});

test('Ассерты инпута', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/#/register');
  await page
    .getByRole('textbox', { name: 'Your Name' })
    .fill(' Константиновский Константин Константинович ');

  // для инпутов
  await expect(page.getByRole('textbox', { name: 'Your Name' })).toHaveValue(
    ' Константиновский Константин Константинович ',
  );
});

test('Ассерты текста', async ({ page }) => {
  await page.goto(URL);

  await expect(page.getByText('A place to share your knowledge.')).toContainText('share');
  await expect(page.getByText('A place to share your knowledge.')).toHaveText(
    'A place to share your knowledge.',
  );
  await expect(page.getByText('A place to share your knowledge.'))
    .filter({ visible: true })
    .toHaveText('A place to share your knowledge.');
});

test('Количество элементов', async ({ page }) => {
  await page.goto(URL);

  await expect(page.locator('.article-preview')).toHaveCount(3);
});
