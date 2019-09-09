import React from 'react';

const BreadCrumb = (props) => {
  const { category } = props;
  return (
    <div className="breadcrumb__label col-lg-2" id="breadcrumb">
      <p className="breadcrumb__label--text">Articles</p>
      <div className="category-p">
        <p className="category-p__label">CATEGORY</p>
      </div>
      <div className="category-t">
        <p className="category-t__label">{category}</p>
      </div>
    </div>
  );
};


export default BreadCrumb;
