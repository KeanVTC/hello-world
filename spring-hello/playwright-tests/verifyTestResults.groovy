def reportFile = new File("spring-hello/playwright-report/index.html")

if (!reportFile.exists()) {
    println "❌ Report file not found!"
    System.exit(1)
}

// Check if "failures" are mentioned in the report (basic check)
def content = reportFile.text.toLowerCase()
if (content.contains("fail") || content.contains("error")) {
    println "❌ Found failures in Playwright test report."
    System.exit(1)
}

println "✅ No failures found in Playwright test report."
System.exit(0)
