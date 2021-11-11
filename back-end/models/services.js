const insertIfNonExistant = (model, queryObj, newObj) => {
  return new Promise((resolve, reject) => {
    model.findOne(queryObj, (err, foundObj) => {
      if (err) reject('Database Error');
      else {
        if (foundObj) {
          reject('Object already exists');
        } else {
          const newInstance = new model(newObj);
          newInstance.save();
          resolve('Successfully created');
        }
      }
    });
  });
};

module.exports = {
  insertIfNonExistant,
};
