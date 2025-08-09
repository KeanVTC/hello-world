// spring-hello/playwright-tests/CustomReporter.js
const fs = require('fs');
const path = require('path');

class CustomReporter {
  onEnd(result) {
    // 1. Read title from CSV
    const csvPath = path.join(__dirname, 'data', 'report_title.csv');
    let titleFromCSV = 'Test Report';
    if (fs.existsSync(csvPath)) {
      const content = fs.readFileSync(csvPath, 'utf-8').trim();
      if (content) {
        titleFromCSV = content.split('\n')[0].trim(); // First line only
      }
    }

    // 2. Get system time
    const timestamp = new Date().toLocaleString();

    // 3. Update HTML report
    const reportPath = path.join(__dirname, 'playwright-report', 'index.html');
    if (fs.existsSync(reportPath)) {
      let html = fs.readFileSync(reportPath, 'utf-8');
      html = html.replace(
        /<h1>.*?<\/h1>/,
        `<h1>${titleFromCSV} - ${timestamp}</h1>`
      );
      fs.writeFileSync(reportPath, html, 'utf-8');
      console.log(`✅ Custom title "${titleFromCSV}" applied with timestamp.`);
    }
  }
}

module.exports = CustomReporter;
