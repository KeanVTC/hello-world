const fs = require('fs');
const path = require('path');

class CustomReporter {
  onBegin(config, suite) {
    const timestamp = new Date().toISOString();
    const reportTitle = '🚀 Hardcoded Static Report Title';

    console.log(`Test run started at: ${timestamp}`);

    const reportDir = path.join(__dirname, 'custom-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Write initial HTML with hardcoded title + timestamp
    fs.writeFileSync(
      path.join(reportDir, 'report.html'),
      `<html>
        <head><title>${reportTitle}</title></head>
        <body>
          <h1>${reportTitle}</h1>
          <p>Started: ${timestamp}</p>
          <ul>`
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

    console.log(`Test run finished at: ${endTime}`);
  }
}

module.exports = CustomReporter;
