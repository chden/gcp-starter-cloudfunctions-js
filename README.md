# Google Cloud Starter - Cloud Functions

This is a starter project for [Google Cloud Functions](https://cloud.google.com/functions) based on nodejs and is invoked by http requests. It is implemented in JavaScript and provides linting, [cors](https://github.com/expressjs/cors), unit tests, system tests, logging and multiple functions via routing.

## Install and run locally

1. Install package and its dependencies:

        npm install

1. Run eslint:

        npm run lint

1. Run unit tests:

        npm test

1. Start local instance:

        npm start

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

    **Note:** Replace `[BASE_URL]` with the url to the cloud function service, e.g. https://us-east1-my-projectid.cloudfunctions.net/

## Logging

By default, `info` level messages are logged. Add the envrionment variable APP_LOG_LEVEL to change the logging level.
This starter uses [winston](https://github.com/winstonjs/winston) as logging library. Please read more about how to
write log entries and about all possible logging levels on the project website.

## License
Distributed under the MIT License. See LICENSE for more information.
