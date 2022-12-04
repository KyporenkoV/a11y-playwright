export const attachAxeReport = async (testInfo, scanResults) => {
    if (scanResults.violations.length > 0) {
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(scanResults.violations, null, 2),
            contentType: 'application/json',
        });
    }
};