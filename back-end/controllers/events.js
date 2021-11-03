const {request} = require('./axios');

const acceptPending = (req, res) => {
    request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({'message': "event accepted", "event": data});
    })
    .catch((e) => {
      console.error(e);
      res.status(404);
    });
};

const declinePending = (req, res) => {
    request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({"message": "event declined", "event": data});
    })
    .catch((e) => {
      console.error(e);
      res.status(404)
    });
};

module.exports = {
  acceptPending,
  declinePending,
};
