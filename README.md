# Viktor Kyporenko
## _Automating accessibility testing using Playwright_

## About
This is material which was used during presentation on QA meetup (06.12.2022).

- 0-live-coding.spec.ts
- 1-base.spec.ts
- 2-reports.spec.ts
- 3-scan-configuration.spec.ts
- 4-using-fixtures.spec.ts
- 5-using-page-objects.spec.ts
- 6-additional-tests.spec.ts

## How to start
Install the dependencies and run tests.
```sh
npm i
npx playwright test
```
 It will run all tests from folder `test`.
 If you need to run tests from folder `templates` just move it to folder test and use `.only` to specify tests for run.
