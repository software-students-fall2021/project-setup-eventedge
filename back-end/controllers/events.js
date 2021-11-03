const {request} = require('./axios');
const DateGenerator = require('random-date-generator')


const acceptPending = (req, res) => {
    request()
    .post('/events.json')
    .then((data) => {
      res.status(200).json({'message': "event accepted", "event": data});
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res.status(200).json({id: generateRandomInt(0, 100), chatName: req.body.chatName});
    });
};

const declinePending = (req, res) => {
    request()
    .post('/chats.json')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      console.error(e);
      // mockaroo limit reached
      res.status(200).json({id: generateRandomInt(0, 100), chatName: req.body.chatName});
    });
};

module.exports = {
  acceptPending,
  declinePending,
};
