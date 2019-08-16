export default (ratings) => {
  let users = 0;
  let rates = 0;
  ratings.map((single) => {
    rates += single.rating * single.users;
    users += single.users;
    return true;
  });
  return rates / users;
  //   (5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33)
};
