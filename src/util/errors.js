function sendError(status = 400, message = 'Unknown error', metadata) {
  return {
    status,
    message,
    metadata
  };
}

module.exports = {
  sendError
};
