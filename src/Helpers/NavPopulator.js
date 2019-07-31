export default response => {
  const unsortedCategory = [];
  let count = {};

  response.map(({ Category }) => {
    unsortedCategory.push(Category.name);
  });

  unsortedCategory.forEach(i => {
    count[i] = (count[i] || 0) + 1;
  });
   

  return count;
   
};
