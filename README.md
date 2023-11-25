# RESTful API for Task Management

RESTful API for a task management system.
The system allow users to create tasks, assign them to others, mark them as
completed, and provide basic analytics on task completion.

## Technologies Used

- Programming language - TypeScript
- Backend - ExpressJs framwork (Nodejs)
- Database - MongoDB (with mongoose library)
- bcryptjs for password security

## Project Setup

1. Clone this repo
2. run 'npm install'
3. setup .env file (use .env.sample for refrence)
4. run 'npm run build' and 'npm start'
5. for dev purpose run 'npm run dev'

code

```sh
git clone https://github.com/Saurabh600/task-management-api
npm install
cp .env.sample .env # and edit .env file
npm run build
npm start
```

## Usages

### Create Account

```http
# endpoint
POST http://localhost:4000/api/user/new
```

```json
// body
{
  "name": "user name",
  "email": "name@gmail.com",
  "password": "passwd",
  "dob": "dd/mm/yyyy",
  "gender": "male/female"
}
```

**NOTE: for authentication purpose for all api calls related to task need to have
additional field of _email and password_ in their body**

### Create New Task

```http
# endpoint
POST http://localhost:4000/api/task/new
```

```json
// body
{
  "title": "",
  "description": "",
  "due_data": "dd/mm/yyyy",
  "completed": false
}
```

### Update Task

```http
# endpoint
PUT http://localhost:4000/api/task?task_id
```

```json
// updaded info
{
  "title": "",
  "description": "",
  "due_data": "dd/mm/yyyy",
  "completed": false
}
```

### Delete Task

```http
DELETE http://localhost:4000/api/task?task_id
```

## Thanks for using my app
