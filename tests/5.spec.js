import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';

let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  username: faker.person.fullName({ lastName: 'Bin' }),
};

test('Registration', async ({ page }) => {
  const main = new MainPage(page);
  const register = new RegisterPage(page);
  const yourFeed = new YourFeedPage(page);

  await main.open();
  await main.gotoRegister();
  await register.signup(user);
  await expect(yourFeed.getProfileName()).toContainText(user.username);
});
