# DemoUp Senior Backend Engineer Challenge

## Getting Started:

    - Clone this repository to your local machine.
    - Navigate to the project directory and run npm install to install the necessary dependencies.


## Running the Application on local machine

### development env:

    - Run:
        npm run dev

*The server should now be running on http://localhost:3001*

### production env:

    - Run:
        npm run start

*The server should now be running on http://localhost:3000*


## Running the Application on DOCKER

  - Run:
      docker compose up


## Endpoints(Samples)

1. curl --request POST \
  --url http://localhost:3000/assets \
  --header 'Content-Type: application/json' \
  --data '{
	"title": "second asset",
	"url": "https://google.com",
	"collectionId": "4cdbfb96-447c-4162-9284-514fae616f37",
	"categoryIds": []
}'

2. curl --request GET \
  --url http://localhost:3000/assets

3. curl --request GET \
  --url http://localhost:3000/assets/43b8eaf9-5f15-443a-9b30-1f5a72bffa0a \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhYTRiZGMyLTlmNzItNDY5My1iZTFkLTliZDYzMmMxOTIxYiIsImVtYWlsIjoidXpvQGdtYWlsLmNvbSIsImlhdCI6MTY4OTUyMzgyMn0.Kk1kkYEeNsOAAnruYmB2Xy52nTEPmtpOlnph9u0qNBY'

4. curl --request POST \
  --url http://localhost:3000/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "uzo@gmail.com",
	"password": "12345"
}'

5. curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "uzo@gmail.com",
	"password": "12345"
}'

6. curl --request DELETE \
  --url http://localhost:3000/assets/43b8eaf9-5f15-443a-9b30-1f5a72bffa0a


## Testing

    Unit Tests: 
        - Run:
            npm test
    Integration Tests:
        - Run:
            npm run test:integration


## API Docs

NB: make sure the server is running
- http://localhost:3000/docs/