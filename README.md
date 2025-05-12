This is a Full-Stack project (Frontend: [Next.js](https://nextjs.org) and Backend: ASP.NET Core) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and `dotnet new webapi -n ShipmentApi`.

Built a simplified Shipment Tracker application with the following capabilities:
- A front-end web dashboard built using Next.js, React, and Material UI.
- A back-end API built using ASP.NET Core Web API, following Clean architecture with Domain-Driven Design and using Entity Framework Core.

## Tech Stack
- Next.js (TypeScript is preferred)
- React
- Material UI
- Axios or SWR
- ASP.NET Core Web API (.NET 8/9)
- Entity Framework Core (In-memory or SQLite)
- Logging
- Swagger

## Getting Started

First, make sure all necessry packages on you local machine:

```bash
dotnet add package Microsoft.EntityFrameworkCore.InMemory
dotnet add package Swashbuckle.AspNetCore

npm install -g npm

# Verify npm version:
npm -v # Should print "10.9.2".

# Download and install fnm:
winget install Schniz.fnm

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v # Should print "v22.15.0".

```

Then, run the development server (for the frontend):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then run the backend API:

```bash
dotnet build
dotnet run
```

Open 
[http://localhost:3000](http://localhost:3000) 
AND
[http://localhost:5217](http://localhost:5217)
with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Design Choices
- This was meant to be simple Shipment Dashboard with three pages (Home, Dashboard, Add Shipment).
- Uses an In-Memory database vs SQLite
- Navigation available between pages
- Axios used over SWR for connection between both ends since for fetching it would be required for functionality
- MaterialUI was the main React library of choice
