export default (ratings) => {
  const x = ratings.map(item => ({
    first: item.rating * item.users,
    second: item.users
  }));
  return (
    x.map(item => item.first).reduce((a, b) => a + b, 0)
    / x.map(item => item.second).reduce((a, b) => a + b, 0)
  );
};
