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



# Theory Solution:

Here is a link to the architecture diagram for the conceptual model: ![Conceptual Model](https://github.com/uzochukwuonuegbu/demoup-backend-challenge/assets/26324423/2e5b8d1e-3b79-40ae-934a-2cf427e56d33)


# Justification:

Microservice-Oriented Architecture:

Microservices allows for scalability, independent deployment, and better separation of concerns.
Each entity (Asset, Category, and Collection e.t.c) can have its own microservice responsible for managing its data and related operations.
Microservices can communicate with each other through well-defined APIs(as well as asynchronously), ensuring loose coupling and flexibility.

In a microservice-oriented architecture, avoiding a mono schema helps maintain the independence of each microservice.
By having separate data storage for each entity, it allows flexibility in evolving the data model of each microservice without affecting others.
It also allows different microservices to use the most appropriate storage technologies for their specific requirements.


# Difference Between Read-optimized model and Write-optimized model:


## Read-Optimized Model:

A read-optimized model is designed to prioritize efficient retrieval and querying of data. It aims to optimize the performance of read operations such as searching, filtering, and retrieving data. Here are some characteristics and considerations of a read-optimized model:

### Denormalization and Data Duplication:

To minimize joins and improve read performance, denormalization techniques can be applied. This involves duplicating data across multiple tables or documents to eliminate the need for complex joins during queries.
For example, in the Asset entity, I would duplicate certain Category information within the Asset document, allowing faster queries on Assets based on Categories without needing to perform joins with the Category microservice.
Denormalization can reduce the complexity of queries but may increase the storage requirements and the effort needed to synchronize duplicated data.

### Caching:

Caching can be employed to store frequently accessed data in memory, reducing the need for repetitive database queries. Caches can be implemented at various levels, such as application-level caches or distributed caches like Redis or Memcached.

### Indexing:

Indexing is another technique to enhance read performance. By creating appropriate indexes on frequently queried fields, the database can quickly locate and retrieve the required data.
In my conceptual model, indexing could be applied to fields like Asset ID, Category ID, or Collection ID to expedite searches and queries involving these attributes.

### Use of Materialized Views:

Materialized views are precomputed views or summaries of data that are stored in a separate structure. They are updated periodically or incrementally to reflect changes in the underlying data.
Materialized views can improve query performance by reducing the need for complex aggregations, joins, or computations during runtime.
In the given model, a materialized view could be created to store a summary of Assets grouped by Category, allowing for fast retrieval of Assets belonging to a particular Category without the need for complex queries.



## Write-Optimized Model:

A write-optimized model is designed to prioritize efficient data modification and maintaining data consistency. It focuses on optimizing the performance of write operations such as creating, updating, and deleting data. Here are some characteristics and considerations of a write-optimized model:


### Normalization:

Normalization involves structuring data in a way that minimizes redundancy and ensures data integrity. It breaks down data into smaller, well-defined entities and establishes relationships between them.
In my model, normalization involved keeping the Categories and Collections as separate entities and establishing appropriate relationships with Assets.- assets_categories for example.
Normalization helps maintain consistency during write operations and simplifies data updates, but it may require additional joins during read operations, potentially impacting read performance.

### Event Sourcing:

Event sourcing is a technique where changes to data are captured as a sequence of events. Instead of updating the current state directly, events representing those changes are stored.
Write operations in a write-optimized model can be implemented as events, allowing for easy replayability and auditing.
Event sourcing can provide an audit trail of changes, enable fine-grained control over data modifications, and support features like event-driven architecture.

### Transaction Management and Consistency Models:

Write operations typically involve multiple steps that need to be executed atomically to maintain data integrity.
*Transaction management ensures that a group of related operations either completes successfully or fails as a whole.*
