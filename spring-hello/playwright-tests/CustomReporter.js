const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(options) {
    // Hardcoded title for testing
    this.reportTitle = options?.reportTitle || '=== TEST REPORT TITLE ===';
  }

  onBegin(config, suite) {
    const timestamp = new Date().toISOString();

    const reportDir = path.join(__dirname, 'custom-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(reportDir, 'report.html'),
      `<html><head><title>${this.reportTitle}</title></head>` +
      `<body><h1>${this.reportTitle}</h1><p>Started: ${timestamp}</p><ul>`
    );
  }

  onTestBegin(test) {
    fs.appendFileSync(
      path.join(__dirname, 'custom-report', 'report.html'),
      `<li>Test: ${test.title}</li>`
    );
  }

  onEnd(result) {
    const endTime = new Date().toISOString();
    fs.appendFileSync(
      path.join(__dirname, 'custom-report', 'report.html'),
      `</ul><p>Ended: ${endTime}</p></body></html>`
    );
  }
}

module.exports = CustomReporter;
