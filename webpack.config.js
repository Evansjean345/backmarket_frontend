const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
  // other configurations...
};
