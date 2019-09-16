import React from 'react';
import { shallow } from '../../enzyme';
import '../../__mocks__/window';
import { HighlightArticle } from '../Components/DisplayArticle/HighlightArticle';

const defaultProps = {
  slug: 'slug',
  postHighlight: jest.fn()
};

describe('HighlightArticle', () => {
  const renderHighlightArticle = (args) => {
    const final = { ...defaultProps, ...args };
    return shallow(<HighlightArticle {...final} />);
  };

  it('should render highlightArticle', () => {
    const wrapper = shallow(<HighlightArticle {...defaultProps} />);
    const buttons = wrapper.find('button');
    const textarea = wrapper.find('textarea');
    const form = wrapper.find('#comment-highlight-form');

    wrapper.instance().checkHighlightedText();
    wrapper.setState({ isModalShown: false, selectionRectangle: {} });

    buttons.map(button => button.simulate('click', {}));

    textarea.simulate('change', { target: { name: 'comment', value: 'comment' } });
    form.simulate('submit', { preventDefault: jest.fn() });

    expect(wrapper.state().comment).toEqual('comment');
    expect(wrapper.find('#highlightCommentModal').length).toBe(1);
  });

  it('should render highlightArticle', () => {
    const wrapper = renderHighlightArticle();
    const buttons = wrapper.find('button');
    buttons.map(button => button.simulate('click', {}));
    wrapper.setState({ selectionRectangle: {}, isModalShown: true });
    wrapper.instance().checkHighlightedText();
    expect(wrapper.find('#highlightCommentModal').length).toBe(1);
  });
});
