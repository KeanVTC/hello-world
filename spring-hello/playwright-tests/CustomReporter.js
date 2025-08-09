const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor() {
    this.reportTitle = 'My Playwright Custom Report';
    this.reportDir = path.join(__dirname, 'custom-report');
    this.reportFile = path.join(this.reportDir, 'report.html');
  }

  onBegin(config, suite) {
    const timestamp = new Date().toISOString();
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    const header = `
      <html>
      <head><title>${this.reportTitle}</title></head>
      <body>
        <h1>${this.reportTitle}</h1>
        <p>Test run started at: ${timestamp}</p>
        <ul>
    `;
    fs.writeFileSync(this.reportFile, header);
  }

  onTestBegin(test) {
    fs.appendFileSync(this.reportFile, `<li>Starting test: ${test.title}</li>`);
  }

  onTestEnd(test, result) {
    fs.appendFileSync(this.reportFile, `<li>Finished test: ${test.title} - Status: ${result.status}</li>`);
  }

  onEnd(result) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.reportFile, `
        </ul>
        <p>Test run ended at: ${timestamp}</p>
      </body>
      </html>
    `);
  }
}

module.exports = CustomReporter;
