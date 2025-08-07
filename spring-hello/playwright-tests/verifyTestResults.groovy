def reportFile = new File("playwright-report/index.html")
if (!reportFile.exists()) {
    println "❌ Report file not found."
    System.exit(1)
}

def reportContent = reportFile.text
if (reportContent.contains("❌") || reportContent.toLowerCase().contains("failed")) {
    println "❌ Test report contains failures."
    System.exit(1)
}

println "✅ All tests passed according to HTML report."
System.exit(0)
