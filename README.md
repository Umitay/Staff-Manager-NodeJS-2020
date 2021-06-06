# staff-manager-
Simple Rest API server to manage an organizathonal staff
I am using:
1. API development based on Nodejs
2. Postman application to work with the API requests. https://www.postman.com/downloads/
3. Postman shared APIs https://www.getpostman.com/collections/3b13256101d943fafd69
4. MongoDB Atlas to work with cloud database service. https://www.mongodb.com/cloud/atlas
5. Git: "git+https://github.com/Umitay/staff-manager-.git"
 

How to run the code: 

cd staff-manager-

nmp install

npm run dev

How to set up/init/connect the database: No needs

Data schema: 

Department:
_id, name, manager_id

Employee:
_id, name, email, manager_id, department_id


Project Structure:

/api
  /config
  /services
  /models
  /routers
  /middlewares
  server.js
  package.json
  .gitignore
  
