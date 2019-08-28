import React from 'react';
import Select from 'react-select';
import propTypes from 'prop-types';

function Selector({
  categories, addContent, editMode, categoryId
}) {
  const options = categories.map(category => ({ label: category.name, value: category.id }));
  /* istanbul ignore next */
  return (
    <div className="category-dropdown__selector">
      <Select
        defaultValue={editMode === 'true' ? options[Number(categoryId) - 1] : 'Select'}
        options={options}
        onChange={category => addContent({ target: { name: 'category', value: category.value } })}
      />
    </div>
  );
}

Selector.propTypes = {
  categories: propTypes.arrayOf(Object).isRequired,
  addContent: propTypes.func.isRequired,
  editMode: propTypes.string,
  categoryId: propTypes.number
};

export default Selector;
