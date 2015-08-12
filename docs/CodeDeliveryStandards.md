# CarZen Code Delivery Standards

All standards outlined below should be followed - violators will be prosecuted.

## Unit Testing
- Ensure you have written adequate unit tests to cover your code.
- Do NOT write unit tests for the sake of writing unit tests and instead write tests that have a purpose.
- Understand what you're trying to test...this sounds obvious but really think about it and then ask yourself if it justifies writing test code.

## Pre-deliver Step(s)
- Execute the 'npm run test' task.  This task will execute all the necessary tasks that Jenkins will also run.  If this task fails, you have work to do prior to delivering.  Figure out the failure and make sure it is fixed prior to delivering your code.
- Make sure your unit test is not setting anything on the model...that's what mocking is for.  Unit tests should isolate a unit of code so do NOT rely on the model.
- Execute tests within a browser and ensure that no XHR calls are made.
