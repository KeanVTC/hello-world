const path = require('path');

module.exports = {
  reporter: [
    [path.join(__dirname, 'CustomReporter.js'), { reportTitle: '*** HARD-CODED TEST TITLE ***' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
    headless: true,
  },
};
