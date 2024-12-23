# reCAPTCHA Validation Service
A Node.js-based application for verifying Google reCAPTCHA tokens. It is designed to be deployed as a lightweight backend service for validating reCAPTCHA responses from client applications.
<br>
## Prerequisites
    Node.js (>= 20.x)
    Google reCAPTCHA secret keys
    Docker (optional, for containerized deployment)
## Installation
Clone the repository:

    git clone https://github.com/arun07aj/recaptcha-service.git
    cd recaptcha-service

Install dependencies:

    npm install

Create environment file:

    # Sample contents
    SITE_SECRET=<SERVER-SIDE-SECRET-KEY>
    REACT_APP_ENV=<DEV/PROD>

## Usage
For development:

    npm run start:dev

For production:

    npm run start:prod

## Endpoints
### POST /verify-captcha

Request:

      {
        "token": "recaptcha-response-token"
      }

Response:

- On success:

      {
        "success": true
      }

- On failure:

      {
        "success": false,
        "error": "Internal server error."
      }

## Running with Docker
Build the Docker image:

    docker build -t recaptcha-service .

Run the container:

    docker run -d --name recaptcha-service -p 5000:5000 -e SITE_SECRET=<SERVER-SIDE-SECRET-KEY>

## CI/CD Deployment

This application supports deployment with CI/CD pipelines. Refer `deploy.yml` for more.
The following secrets are required for CI/CD pipeline.
    
    DOCKER_USERNAME: Your Dockerhub username
    DOCKER_PASSWORD: Your Dockerhub password
    SITE_SECRET    : Server Side secret key obtained from https://www.google.com/recaptcha/admin
    VM_HOSTNAME    : IP of Deployment server
    VM_SSH_KEY     : SSH key in Base64 encoded format
    VM_USERNAME    : Username for Deployment Server