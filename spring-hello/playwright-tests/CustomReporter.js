// spring-hello/playwright-tests/CustomReporter.js
const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor() {
    // Read type from environment variable (set in Jenkins or local run)
    this.reportType = process.env.REPORT_TYPE || 'test'; 
    this.reportTitle = this.loadTitleFromCSV();
  }

  loadTitleFromCSV() {
    const csvPath = path.join(__dirname, 'report-title.csv');
    if (!fs.existsSync(csvPath)) {
      console.warn('⚠ CSV file not found, using default title.');
      return 'Playwright Test Report';
    }

    const csvData = fs.readFileSync(csvPath, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('#'));

    for (const row of csvData) {
      const [type, title] = row.split(',');
      if (type && title && type.trim() === this.reportType) {
        return title.trim();
      }
    }

    return 'Playwright Test Report';
  }

  onBegin(config, suite) {
    const timestamp = new Date().toISOString();
    console.log(`🚀 Test run started at: ${timestamp}`);
    this.startTime = timestamp;

    const reportDir = path.join(__dirname, 'custom-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(reportDir, 'report.html'),
      `<html><head><title>${this.reportTitle}</title></head><body><h1>${this.reportTitle} - ${timestamp}</h1><ul>`
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
