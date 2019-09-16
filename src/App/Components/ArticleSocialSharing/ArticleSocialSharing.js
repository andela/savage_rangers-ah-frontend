import React from 'react';
import axios from '../../../configs/axios';

const ArticleSocialSharing = (props) => {
  const { slug, title } = props;
  const articleLink = `https://authors-haven-staging.herokuapp.com/articles/${slug}`;
  const handleShare = (social) => {
    switch (social) {
      case 'linkedin':
        window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${articleLink}&title=${title}`,
          '_blank');
        axios.post(`api/articles/${slug}/share/linkedin`);
        break;
      case 'facebook':
        // eslint-disable-next-line no-undef
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.shares',
          action_properties: JSON.stringify({ object: { 'og:url': articleLink } })
        });
        axios.post(`api/articles/${slug}/share/facebook`);
        break;
      case 'email':
        window.open(`mailto:?subject=${title}&body=${articleLink}`, '_self');
        axios.post(`api/articles/${slug}/share/gmail`);
        break;
      default:
        window.open(`https://twitter.com/intent/tweet?text=${title} - ${articleLink}`, '_blank');
        axios.post(`api/articles/${slug}/share/twitter`);
    }
  };
  return (
    <div>
      <div className="social-share__container">
        <button
          id="twitter-share"
          type="button"
          onClick={() => handleShare()}
          className="btn twitter-share d-flex align-items-center justify-content-center"
        >
          <i className="fab fa-2x fa-twitter" />
        </button>
        <button
          id="linkedin-share"
          type="button"
          onClick={() => handleShare('linkedin')}
          className="btn linkedin-share d-flex align-items-center justify-content-center"
        >
          <i className="fab fa-2x fa-linkedin-in" />
        </button>
        <button
          id="facebook-share"
          type="button"
          className="d-flex align-items-center justify-content-center btn facebook-share"
          onClick={() => handleShare('facebook')}
        >
          <i className="fab fa-2x fa-facebook" />
        </button>
        <button
          id="email-share"
          type="button"
          className="btn gmail-share d-flex align-items-center justify-content-center"
          onClick={() => handleShare('email')}
        >
          <i className="fas fa-2x fa-envelope-open" />
        </button>
      </div>
    </div>
  );
};

export default ArticleSocialSharing;
