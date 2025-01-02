# Multi-User TODO List Backend

A backend for a multi-user TODO application using .NET Core, Entity Framework, and Azure SQL.

## Features
- User authentication with JWT
- Task management for users and admins
- Task history tracking
- Role-based access control

## Prerequisites
- .NET 6 or later
- Azure SQL database
- Visual Studio or another IDE

## Setup
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [.NET SDK](https://dotnet.microsoft.com/download) (Version: `9.0.0`).
3. Use the current Azure server credentials or setup your own
4. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multi-user-todo-list.git
   cd multi-user-todo-list
   ```
5. From the root directory, run `npm run install:all` after installation finishes for both Backend and Frontend, run `npm run start:all`
6. If relevant, contact author to gain access to SQL DB
7. In order to enable drag and drop, Strict Mode must be disabled


## TODO

1.  Clean up the backend, create more DTOs for cleaner and more specialized schemas for the endpoint
2.  Split the redux slices and move actions into thier own files for maintainablitiy
3.  Created dedicates files for selectors, taking more business logic out of the containers and moving it to selectors
4.  Clean up Taskboard DnD logic
5.  improve the overall design especially in the modal
6.  handle more user role checks in selectors
7.  find a better free to use server/db hosting solution
8.  create a Loader/Spinner component 