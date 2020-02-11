import { Selector } from 'testcafe';

fixture`Getting Started`;

fixture`Getting Started`.page`http://localhost:7777/login`;

test('My first test', async t => {
  await t
    .typeText('input[name=email]', 'yury.shevchenko')
    .expect(Selector('input[name=email]').value)
    .eql('yury.shevchenko');
});
