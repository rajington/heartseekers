import React from 'react';

const Summoner = ({ routeParams: { region, name } }) => (
  <h2>
    {region} - {name}
  </h2>
);

Summoner.propTypes = {
  routeParams: React.PropTypes.shape({
    region: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
};

export default Summoner;
