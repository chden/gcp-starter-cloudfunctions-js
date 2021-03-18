# Google Cloud Starter - Cloud Functions

This is a starter project for [Google Cloud Functions](https://cloud.google.com/functions) based on nodejs and is invoked by http requests. It is implemented in JavaScript and provides linting, [cors](https://github.com/expressjs/cors), unit tests, system tests, logging and multiple functions via routing.

## Prerequisites

1. Before you can start coding, make sure that [gcloud is installed](https://cloud.google.com/sdk/docs/install).

1. This starter also requires [Node.js](https://nodejs.org/en/download/).

If you already have installed the prerequisites, then you're all set.

## Install and run locally

1. Install package and its dependencies:

        npm install

1. Run eslint:

        npm run lint

1. Run unit tests:

        npm test

1. Start local instance:

        npm start

1. Open browser and navigate to http://localhost:8080/ or http://localhost:8080/gcp to invoke the service.

## Deploy to Google Cloud

1. Configure project and region for [gcloud](https://cloud.google.com/sdk):

        gcloud config set project [PROJECT_ID]
        gcloud config set functions/region [REGION]

    **Note:** Replace `[PROJECT_ID]` with the google cloud project id. Specifying the region is optional, replace the `[REGION]` accordingly.

1. Deploy to google cloud:

        npm run deploy

1. Run system test:

        export BASE_URL="[BASE_URL]"
        npm run test:system

    **Note:** Replace `[BASE_URL]` with the url to the cloud function service, e.g. https://REGION_ID-PROJECT_ID.cloudfunctions.net/.

1. Open service in browser: https://REGION_ID-PROJECT_ID.cloudfunctions.net/FUNCTION_NAME.

## Logging

By default, `info` level messages are logged. Add the envrionment variable APP_LOG_LEVEL to change the logging level:

        gcloud functions deploy FUNCTION_NAME --update-env-vars APP_LOG_LEVEL=debug

Also consider to [change the environment variables](https://cloud.google.com/functions/docs/env-var#updating_runtime_environment_variables) with Cloud Console. The default logName is "projects/[PROJECT_ID]/logs/[PACKAGE_JSON_NAME]_log".
This starter uses [winston](https://github.com/winstonjs/winston) as logging library. Please read more about how to
write log entries and about all possible logging levels on the project website.

## License
Distributed under the MIT License. See LICENSE for more information.
