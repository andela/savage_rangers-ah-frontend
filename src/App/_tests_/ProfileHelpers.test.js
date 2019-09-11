import countRating from '../../Helpers/countRating';
import compareSubscription from '../../Helpers/compareSubscription';

const rating = {
  allUsers: 35,
  statistics: [
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
  ]
};
test('Count rating', () => {
  expect(countRating(rating.statistics)).toEqual(2.96);
});

test('Compare subscription', () => {
  const found = compareSubscription('alain',
    [{ follower: 'alain' }, { follower: 'alin2' }],
    'follower');
  expect(found).toEqual({ follower: 'alain' });
});
