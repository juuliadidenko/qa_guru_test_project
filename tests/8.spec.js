import { expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/index';
import { test } from '../src/helpers/fixtures/fixture';

test('Registration with email and password (facade + fixture)', async ({ app }) => {
  const user = new UserBuilder().withEmail().withUsername().withPassword().build();

  await app.main.gotoRegister();
  await app.register.signup(user);

  await expect(app.yourFeed.getProfileName()).toContainText(user.username);
});
