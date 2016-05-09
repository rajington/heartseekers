import React from 'react';

const LolImg = ({ src, alt }, { data: { version } }) => (
  <img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/${src}`} alt={alt} />
);

LolImg.propTypes = {
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string,
};

LolImg.contextTypes = {
  data: React.PropTypes.object,
};

export default LolImg;
