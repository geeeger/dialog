var livereloadPortNumber = 8888;
var keepalivePortNumber = 8081
var testPortNumber = 8082;

module.exports = {
  "livereloadPortNumber": livereloadPortNumber,
  "keepalivePortNumber": keepalivePortNumber,
  "testPortNumber": testPortNumber
};

function generatePortNumber() {
  return (Math.floor((Math.random() * 10000)) + 10000) % 65535;
}
