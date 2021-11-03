const {EVENTS: fakeEventsData} = require('../mock-data/events');

const getEventsPending = async (_, res) => {
  res.send(fakeEventsData);
};

const createEvent = async (req, res) => {
  //data from form
  const eventName = req.body.eventName;
  const mdy = req.body.mdy;
  const eventTime = req.body.eventTime;
  const locationSearch = req.body.locationSearch;
  const eventDescription = req.body.eventDescription;
  res
    .status(200)
    .json({
      eventName: req.body.eventName,
      mdy: req.body.mdy,
      eventTime: req.body.eventTime,
      locationSearch: req.body.locationSearch,
      eventDescription: req.body.eventDescription,
    });
};

module.exports = {
  getEventsPending,
  createEvent,
};
