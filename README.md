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
2. Install [.NET SDK](https://dotnet.microsoft.com/download) (Version: `X.X.X`).
3. Install the database server (e.g., PostgreSQL) and configure it, or use the currently setup server
4. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multi-user-todo-list.git
   cd multi-user-todo-list
   ```
5. From the root directory, run `npm run install:all` after installation finishes for both Backend and Frontend, run `npm run start:all`
6. If relevant, contact author to gain access to SQL DB
7. In order to enable drag and drop, Strict Mode must be disabled
