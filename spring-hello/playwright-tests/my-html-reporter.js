// my-html-reporter.js
const fs = require('fs');
const path = require('path');
const HtmlReporter = require('@playwright/test/lib/reporters/html').default;

class MyHtmlReporter extends HtmlReporter {
  constructor(options) {
    super(options);
  }

  async onEnd(result) {
    // Run the original HTML reporter to generate the report
    await super.onEnd(result);

    // Path to generated index.html
    const reportPath = this._reportFolder;
    const indexFile = path.join(reportPath, 'index.html');

    if (fs.existsSync(indexFile)) {
      let html = fs.readFileSync(indexFile, 'utf8');

      // Get timestamp and step title
      const timestamp = new Date().toLocaleString();
      const stepTitle = process.env.REPORT_TITLE || 'Playwright E2E Tests';

      // Modify <title>
      html = html.replace(
        '<title>Playwright Test Report</title>',
        `<title>${stepTitle} - ${timestamp}</title>`
      );

      // Add banner at the top of the report
      const bannerHTML = `
      <div style="
        background: #222;
        color: white;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif;
        border-bottom: 3px solid #00bcd4;
      ">
        ${stepTitle} — ${timestamp}
      </div>
      `;

      html = html.replace('<body>', `<body>${bannerHTML}`);

      // Save changes
      fs.writeFileSync(indexFile, html, 'utf8');
      console.log(`✅ Custom HTML report updated with title and timestamp`);
    } else {
      console.warn(`⚠️ Could not find ${indexFile}`);
    }
  }
}

module.exports = MyHtmlReporter;
