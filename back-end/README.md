# EventEdge back-end

Instructions on how to get started with _EventEdge_ back-end server

## Instructions to start development server

1. Run `npm install` to install all the dependencies
2. Add `.env` file to the root of the directory that contains the following variables:
    - `URI` - Atlas connection string URI
    - `JWT_SECRET` - JWT secret token
3. Run `npm run dev` to start server listener with hot-reload

## Linting and formatting

- To format the code, run `npm run format`
- To lint the code, run `npm run lint`

## Tests and code coverage

- To check code coverage, run `npm run coverage`
- To run all tests, run `npm test`
- To run single test and watch, run `npm test-single */test-name.test.js`
