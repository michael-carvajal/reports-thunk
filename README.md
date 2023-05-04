# React-Redux With Thunks Project Assessment

Read the ENTIRE instructions before running specs for the first time; it
contains important information about running tests with Jest.

## Background

You will be adding Redux **thunks** onto a self-reflection report app called
Progress Tracker Lite. This application should allow for the creation,
display, updating, and deletion of reports.

The necessary React components are provided in the __src__ folder.

This application allows the user to perform CRUD on reports. Each report has
three fields: `id`, `understanding`, and `improvement`.

The Redux store, reducer, and action creators are provided for you.

## Setup

If any step of the setup fails, ask an instructor for help.

1. Download or clone the repository.
2. Set up the React app that will make requests to the V1 Server.
   - Run `npm install`.
   - Run `PORT=3001 npm run start-v1` to start the React app with the V1 Server
     that you can view at [http://localhost:3001].
3. Set up the React app that will make requests to the V2 Server.
   - Run `npm install` (if you haven't already).
   - Run `PORT=3002 npm run start-v2` to start the React app with the V2 Server
     that you can view at [http://localhost:3002].

The React apps at [http://localhost:3001] (talking to the V1 Server) and
[http://localhost:3002] (talking to the V2 Server) use the same code but talk to
two different servers. The V1 and V2 server endpoints are exactly the same but
will return different data.

## Your task

Your task for this assessment is threefold:

1. Properly connect the components in the React application to the Redux store
2. Create thunks that enable your components to request, delete, create, update,
   and process reports from API endpoints
3. Store the resulting reports data in the Redux store

Do not worry about styling or trying to give your app a pretty display.
Functionality is all you need to worry about in this assessment.

**DO NOT** manipulate any code in the **src/index.js** file. Doing so may break
some test specs.

Take some time to familiarize yourself with the following code and documentation
as you will need to understand them to complete your task:

- Component files found in **src/components**
- Redux reducer, actions and action creators found in **/src/store/report.js**
- Documentation for the V1 and V2 servers (see below; both servers have the same
  documentation)

## API documentation

For both V1 Server and V2 Server.

### Get all reports

Request:

- Method: `GET`
- URL pattern: `/api/reports`

Successful Response:

- Status Code: `200`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
[
   { "1": { "id": 1 } },
   { "2": { "id": 2 } },
   { "5": { "id": 5 } }
]
```

### Get a single report

Request:

- Method: `GET`
- URL pattern: `/api/reports/:reportId`

Successful Response:

- Status Code: `200`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "id": 1,
   "improvement": "Example improvement details",
   "understanding": "Example understanding details"
}
```

### Create a report

Request:

- Method: `POST`
- URL pattern: `/api/reports`
- Headers: [`'Content-Type': 'application/json'`]
- Expected Body Format:

```json
{
   "understanding": "...",
   "improvement": "..."
}
```

Successful Response:

- Status Code: `201`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "id": 6,
   "improvement": "Example improvement details",
   "understanding": "Example understanding details"
}
```

Error Response:

- Status Code: `400`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "errors": {
      "improvement": "Improvement is required",
      "understanding": "Understanding needs to be more than 40 characters long"
   }
}
```

### Update a report

Request:

- Method: `PUT` or `PATCH`
- URL pattern: `/api/reports/:reportId`
- Headers: [`'Content-Type': 'application/json'`]
- Expected Body Format:

```json
{
   "understanding": "...",
   "improvement": "..."
}
```

Successful Response:

- Status Code: `200`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "id": 6,
   "improvement": "Example improvement details",
   "understanding": "Example understanding details"
}
```

Error Response:

- Status Code: `400`
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "errors": {
      "improvement": "Improvement is required",
      "understanding": "Understanding needs to be more than 40 characters long"
   }
}
```

### Delete a report

Request:

- Method: `DELETE`
- URL pattern: `/api/reports/:reportId`

Successful Response:

- Status Code: `200`
- Headers: [`'Content-Type': 'application/json'`]
- Body:

```json
{
   "message": "Successfully deleted"
}
```

Example Error Response:

- Status Code of `400` or above
- Headers: [`'Content-Type': 'application/json'`]
- Example Body:

```json
{
   "errors": {
      "message": "Unauthorized"
   }
}
```

## Running specs

You will be testing your code using Jest with React Testing Library. Run
`npm test` to run all the test specs. This will enter watch mode, which will
start watching your files for changes and run all the test specs whenever your
files change. To run your tests initially rather than waiting for a file change
you may use the `a` command, as outlined in the menu of options for running
tests manually. To exit watch mode, type `q` (or `^c`).

See the 'Debugging Tips' section below for information on how to run a single
spec file.

For this assessment, Jest specs live in a single **\_\_tests\_\_** folder
within the **src** folder:

1. **src/\_\_tests\_\_/1-display-report-list.test.js**
2. **src/\_\_tests\_\_/2-remove-report.test.js**
3. **src/\_\_tests\_\_/3-display-report-details.test.js**
4. **src/\_\_tests\_\_/4-create-report.test.js**
5. **src/\_\_tests\_\_/5-update-report.test.js**

## Phase 1: Display a list of reports

On the root page of the application, `/`, display a list of the current reports
in the Redux store after populating the Redux store with an API call to
`GET /reports` using `fetch`.

In the browser, make sure the root page of the application (`/`) looks like this:

![index-page-screenshot]

Run the following command and pass the test specs to continue:

```sh
npm test 1-display-report-list
```

**HINT 1:** Think about the first steps of data flow for how a
component can get access to this data.

**HINT 2:** Make sure to look through all the React components to see which
components are being rendered at the root page of the application, `/`.

## Phase 2: Remove a report

**IMPORTANT NOTE:** This phase requires Phase 1 test specs to be passing.

On the root page of the application, `/`, clicking the `Delete` button for a
report should make an API call to `DELETE /api/reports/:reportId`. If
successful, the report should be removed from the Redux store and no longer
appear on the index page. The button click should not delete/modify anything if
the `DELETE /api/reports/:reportId` API call returns an error.

To set the `DELETE /api/reports/:reportId` API call to always return an error,
enter this in the browser console:

```js
window.simulateDeleteError();
```

To restore the normal function of the `DELETE /api/reports/:reportId` API call,
enter this in the browser console:

```js
window.removeDeleteErrorSimulation();
```

Make sure the root page of the application, `/`, looks like this after the
`Delete` button next to "Report #1" is clicked:

![remove-report-screenshot]

Run the following command and pass the test specs to continue:

```sh
npm test 2-remove-report
```

## Phase 3: Display a report's details

**IMPORTANT NOTE:** This phase requires Phase 1 test specs to be passing.

On the root page of the application, `/`, clicking the report name link (e.g.,
"Report #1") should direct a user to the `/reports/:reportId` route. At this
route, you should make an API call to `GET /api/reports/:reportId` to retrieve
the report's additional information and add it to the application's Redux store.
Then, display the details of the report in the Redux store that has a matching
`id` to the `:reportId` route parameter.

An additional test ensures that navigating directly to URLs of
`/reports/:reportId` on the browser does not break functionality.

Make sure the report detail page of "Report #1" at the route `/reports/1` looks
like this in the browser:

![display-report-details-screenshot]

Run the following command and pass the test specs to continue:

```sh
npm test 3-display-report-details
```

## Phase 4: Create a report

**IMPORTANT NOTE:** This phase requires Phase 1 and 3 test specs to be passing.

On the root page of the application, `/`, clicking the "New Report" link should
direct a user to the `/reports/new` route. At this route, the application should
display the form to create a new report. Form submission should trigger an API
call to `POST /api/reports`. If the API call is successful, the new report
should be added to the Redux store and the user should be redirected to the
`/reports/:reportId` route, where the `:reportId` route parameter will be
replaced by the `id` assigned to the newly created report. If the API call is
NOT successful, the form page should simply display the errors; there should be
no redirection and no report added to the Redux store.

To set the `CREATE /api/reports/` API call to always return an error, enter this
in the browser console:

```js
window.simulateCreateError();
```

To restore the normal function of the `CREATE /api/reports/` API call, enter
this in the browser console:

```js
window.removeCreateErrorSimulation();
```

Fill out the create report form in the browser at `/reports/new`. Once the form
is submitted, make sure the report details page shows the input values of the
form, similarly to the page below:

![report-details-after-create-screenshot]

Run the following command and pass the test specs to continue:

```sh
npm test 4-create-report
```

## Phase 5: Update a report

**IMPORTANT NOTE:** This phase requires Phase 1 and 3 test specs to be passing.

On the root page of the application, `/`, clicking the `Edit` link for a report
should direct a user to the `/reports/:reportId/edit` route, where `:reportId`
is replaced with the `id` of the report. At this route, the application should
issue an API call to `GET /api/reports/:reportId` to get the report's detailed
information and add it to the Redux store. The page should then display the form
inputs with the report's current information for editing.

Submitting the form should issue an API call to `PUT /api/reports/:reportId`. If
the API call is successful, the report should be updated in the Redux store and
the user should be redirected to the `/reports/:reportId` route, where the
`:reportId` route parameter is replaced by the `id` of the updated report. If
the API call is NOT successful, the form page should simply display the errors;
there should be no redirection and no updating of the report in the Redux store.

To set the `PUT /api/reports/:reportId` API call to always return an error,
enter this in the browser console:

```js
window.simulateUpdateError();
```

To restore the normal function of the `PUT /api/reports/:reportId` API call,
enter this in the browser console:

```js
window.removeUpdateErrorSimulation();
```

In the browser, fill out the update report form at `/reports/1/edit`. Once the
form is submitted, make sure the report details page shows the input values of
the form, similarly to the page below:

![report-details-after-update-screenshot]

Run the following command and pass the test specs to continue:

```sh
npm test 5-update-report
```

## Debugging tips

Jest is Facebook's de facto testing framework for React components. Here are
some tips for making debugging a little less intimidating.

1. When in watch mode, Jest will often start running its tests before you finish
   making your changes but show the by-then completed changes when reporting any
   errors. As a result, code that is correct can look like it failed. The
   takeaway:  
   **Always re-run a failed test before you start despairing and trying to
   debug.**
2. Examine the test files to see the expected behavior.

## Submission

Make sure you are passing all the test specs by running:

```sh
npm test
```

1. Delete the __node_modules__ directory from your project.
2. Zip your project.
3. Submit the zip folder.

[http://localhost:3001]: http://localhost:3001
[http://localhost:3002]: http://localhost:3002
[index-page-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/index-page-screenshot.png
[remove-report-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/remove-report-screenshot.png
[display-report-details-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/display-report-details-screenshot.png
[report-details-after-create-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/report-details-after-create-screenshot.png
[report-details-after-update-screenshot]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-15/report-details-after-update-screenshot.png