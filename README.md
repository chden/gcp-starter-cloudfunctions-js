This is a simple starter project for Google Cloud Function based on nodejs.

## Installation
Fork and clone the repository, than install the package and its dependencies: ```npm install .```

## Run locally
To start a local instance type: ```npm start```

## Deploy to GCP
### Set project
List available projects: ```gcloud projects list```

Set project: ```gcloud config set project YOUR_PROJECT_ID```

### Set region
List available regions: ```gcloud functions regions list```

Set region: ```gcloud config set functions/region YOUR_REGION```

### Deploy
Finally deploy to GCP: ```npm run deploy```

## License
Distributed under the MIT License. See LICENSE for more information.
