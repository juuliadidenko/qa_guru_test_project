import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/index';
import { App } from '../src/pages/app.page';

test('Registration', async ({ page }) => {
  const user = new UserBuilder().withEmail().withUsername().withPassword().build();
  const app = new App(page);

  await app.main.open();
  await app.main.gotoRegister();
  await app.register.signup(user);

  await expect(app.yourFeed.getProfileName()).toContainText(user.username);
});
