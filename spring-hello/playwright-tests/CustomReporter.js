const fs = require('fs');
const path = require('path');

class CustomReporter {
  constructor(options) {
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
    // Format timestamp like "YYYY-MM-DD HH:mm:ss"
    const timestamp = this.startTime.toISOString().replace('T', ' ').substring(0, 19);

    // Use Jenkins WORKSPACE env var or fallback to __dirname
    const workspaceDir = process.env.WORKSPACE || __dirname;

    // Build absolute path to your CSV file
    const csvPath = path.join(workspaceDir, 'spring-hello', 'playwright-tests', 'data', 'report-title.csv');

    let reportTitle = 'Default Report Title';
    try {
      if (fs.existsSync(csvPath)) {
        const csvContent = fs.readFileSync(csvPath, 'utf8');
        reportTitle = csvContent.split('\n')[0].trim(); // Get first line as title
      } else {
        console.warn(`CSV file not found at ${csvPath}`);
      }
    } catch (err) {
      console.error('Error reading CSV file:', err);
    }

    // Generate HTML report
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${reportTitle}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #2c3e50; }
          ul { list-style-type: none; padding: 0; }
          li { margin-bottom: 8px; }
          .passed { color: green; }
          .failed { color: red; }
          .skipped { color: orange; }
        </style>
      </head>
      <body>
        <h1>${reportTitle}</h1>
        <p>Generated at: ${timestamp}</p>
        <ul>
          ${this.results.map(r => {
            const statusClass = r.status === 'passed' ? 'passed' : (r.status === 'failed' ? 'failed' : 'skipped');
            return `<li class="${statusClass}">${r.title} — ${r.status}</li>`;
          }).join('')}
        </ul>
      </body>
      </html>
    `;

    // Create output directory if not exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Write the report file
    fs.writeFileSync(path.join(this.outputDir, 'index.html'), html);

    console.log(`Custom report generated at ${path.join(this.outputDir, 'index.html')}`);
  }
}

module.exports = CustomReporter;
