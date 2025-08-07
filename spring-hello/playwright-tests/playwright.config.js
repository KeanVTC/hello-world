const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:9090',
  },
});
