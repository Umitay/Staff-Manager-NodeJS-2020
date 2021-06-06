# staff-manager-

Simple Rest API server to manage an organizathonal staff I am using:

1. API development based on Nodejs
2. Postman application to work with the API requests. https://www.postman.com/downloads/
3. MongoDB Atlas to work with cloud database service. https://www.mongodb.com/cloud/atlas
4. Testing with ?

How to run the code: npm run dev

How to set up/init/connect the database: ..

Data schema:

Department:
id(PK), name, manager_id, location_id

Employee:
id(PK), name, address, phone, position_id, manager_id, department_id

Project Structure:

/api /configure /services /models/ /routers /test server.js package.json .gitignore
  
