This is a simple starter project for Google Cloud Function based on nodejs.

## Installation
Fork and clone the repository, than install the package and its dependencies: ```npm install .```

## Run locally
To start a local instance type: ```npm start```

## Deploy to GCP
### Set project
List available gcp projects: ```gcloud projects list```

Set project for gcloud: ```gcloud config set project YOUR_PROJECT_ID```

### Set region
List available regions: ```gcloud functions regions list```

Set region for glcoud: ```gcloud config set functions/region YOUR_REGION```

### Deploy
Finally deploy to gcp: ```npm run deploy```

## License
Distributed under the MIT License. See LICENSE for more information.
