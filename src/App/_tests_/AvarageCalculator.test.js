import calculateAverage from '../../Helpers/calculateAverageRating';

describe('Calculate average', () => {
  it('It returns a number', () => {
    const average = calculateAverage([
      {
        rating: 1,
        users: 5,
        percentage: 14
      },
      {
        rating: 2,
        users: 4,
        percentage: 11
      },
      {
        rating: 3,
        users: 9,
        percentage: 26
      },
      {
        rating: 4,
        users: 1,
        percentage: 29
      },
      {
        rating: 5,
        users: 6,
        percentage: 20
      }
    ]);
    expect(average).toEqual(2.96);
  });
});
