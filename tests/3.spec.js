import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';
let email = faker.internet.email();
let password = faker.internet.password();
let username = faker.person.fullName({ lastName: 'Bean' });

test.beforeEach('Go to realworld.qa.guru', async ({ page }) => {
  await page.goto(URL);
});

test('Registration', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('main')).toContainText('Your Feed');
  await expect(page.getByRole('navigation')).toContainText(username);
});

test('User cannot register with existing email and password', async ({ page }) => {
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('main')).toContainText('Your Feed');
  await expect(page.getByRole('navigation')).toHaveText(username);
});
