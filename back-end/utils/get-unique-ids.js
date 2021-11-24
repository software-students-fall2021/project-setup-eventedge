const getUniqueIds = (ids) =>
  ids.filter((curr, index, self) => self.indexOf(curr) === index);

module.exports = getUniqueIds;
