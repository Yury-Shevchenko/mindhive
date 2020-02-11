function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    // simulate an API
    setTimeout(() => resolve(this.foods), 5000);
  });
};

// test
describe('mocking', () => {
  xit('mocks a reg function', () => {
    const fetchExperiments = jest.fn();
    fetchExperiments('reaction test');
    expect(fetchExperiments).toHaveBeenCalled();
    expect(fetchExperiments).toHaveBeenCalledWith('reaction test');
  });

  xit('can create a person', () => {
    const me = new Person('Yury', ['sundae', 'eggs']);
    expect(me.name).toBe('Yury');
  });

  xit('can fetch foods', async () => {
    const me = new Person('Yury', ['sundae', 'eggs']);
    // mock the fetch function
    me.fetchFavFoods = jest
      .fn()
      .mockResolvedValue(['eggs', 'suschi', 'ramyen']);
    const foods = await me.fetchFavFoods();
    console.log('foods', foods);
    expect(foods).toContain('eggs');
  });
});
