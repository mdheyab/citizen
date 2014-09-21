var secrets = {

  development: {
    secrets: '0c69a80558d574b43febd481cab69d45'
  }

};

module.exports = secrets[process.env.NODE_ENV || 'development'];
