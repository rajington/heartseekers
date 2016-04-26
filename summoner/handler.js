export default ({ region, name }) => {
  const key = `${region.toLowerCase()}-${name.toLowerCase()}`;
  return key;
};
