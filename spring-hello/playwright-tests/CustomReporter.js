const fs = require('fs');
const path = require('path');

class CustomReporter {
  onBegin(config, suite) {
    const timestamp = new Date().toISOString();
    console.log(`🚀 Test run started at: ${timestamp}`);

    const reportDir = path.join(__dirname, 'custom-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(reportDir, 'report.html'),
      `<html><head><title>Playwright Test Report</title></head>` +
      `<body><h1>Playwright Test Report</h1><p>Started: ${timestamp}</p><ul>`
    );
  }

  onTestBegin(test) {
    console.log(`🧪 Starting test: ${test.title}`);
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
    console.log(`✅ Test run finished at: ${endTime}`);
  }
}

module.exports = CustomReporter;
