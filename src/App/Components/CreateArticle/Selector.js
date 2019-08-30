import React from 'react';
import Select from 'react-select';
import propTypes from 'prop-types';

function Selector({ categories, addContent }) {
  const options = categories.map(category => ({ label: category.name, value: category.id }));
  return (
    <div className="category-dropdown__selector">
      <Select
        options={options}
        onChange={category => addContent({ target: { name: 'category', value: category.value } })}
      />
    </div>
  );
}

Selector.propTypes = {
  categories: propTypes.arrayOf(Object).isRequired,
  addContent: propTypes.func.isRequired
};

export default Selector;
