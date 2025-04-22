// Fake authMiddleware for testing
module.exports = (req, res, next) => {
  // Simulate an authenticated user
  req.user = {
    id: "6614a5879f06d5e06d874b1d", // <-- User id of DB
  };
  next();
};
