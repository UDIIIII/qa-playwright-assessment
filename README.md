## QA Automation Assessment

Framework built using Playwright and TypeScript.

### Installation

npm install
npx playwright install

### Run Tests

- Run all tests: `npx playwright test`
- View Report: `npx playwright show-report`

### Structure

- **POM Architecture**: Decoupled selectors from test logic.
- **Data-Driven Validation**: Dynamically calculates price bounds (±20%) rather than hardcoding values.
- **Resilience**: Integrated explicit waits and descriptive error messages for failed assertions.
