const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(options) {
    this.reportTitle = options.reportTitle || 'Default Report Title';
    this.outputDir = options.outputDir || 'custom-report';
    this.results = [];
  }

  onBegin() {
    this.startTime = new Date();
  }

  onTestEnd(test, result) {
    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
    });
  }

  async onEnd() {
    const timestamp = this.startTime.toISOString().replace('T', ' ').substring(0, 19);

    // Generate a simple extra HTML page
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${this.reportTitle} - Summary</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f7f9fc; color: #222; }
          h1 { color: #0b66c2; }
          ul { list-style-type: none; padding: 0; }
          li { margin-bottom: 8px; }
          .passed { color: green; }
          .failed { color: red; }
          .skipped { color: orange; }
          a { color: #0b66c2; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>${this.reportTitle} - Summary</h1>
        <p>Report generated at: ${timestamp}</p>
        <p>
          View the full detailed report here: 
          <a href="../playwright-report/index.html" target="_blank">Default Playwright HTML Report</a>
        </p>
        <ul>
          ${this.results.map(r => {
            const statusClass = r.status === 'passed' ? 'passed' : (r.status === 'failed' ? 'failed' : 'skipped');
            return `<li class="${statusClass}">${r.title} — ${r.status}</li>`;
          }).join('')}
        </ul>
      </body>
      </html>
    `;

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    fs.writeFileSync(path.join(this.outputDir, 'index.html'), html);

    console.log(`Custom summary report generated at ${path.join(this.outputDir, 'index.html')}`);
  }
}

module.exports = CustomReporter;
