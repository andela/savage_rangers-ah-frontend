export default (ratings) => {
  let users = 0;
  let rates = 0;
  ratings.map((single) => {
    rates += single.rating * single.users;
    users += single.users;
    return true;
  });
  return rates / users;
};
