const acceptPending = (req, res) => {
    res.send('event accepted');
  };
  
  const declinePending = (req, res) => {
    res.send('event declined');
  };
  
  module.exports = {
    acceptPending,
    declinePending,
  };