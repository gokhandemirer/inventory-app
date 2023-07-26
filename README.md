# Inventory App

Inventory app that will help us manage our inventory.
The Inventory App is a web-based application that allows businesses to manage their inventory. The application provides a user-friendly interface to manage inventory and track sales.

## Features

-   Add, edit, and delete inventories

## Tech Stack

-   [Next.js - React framework](https://nextjs.org)
-   [tRPC - End-to-end typesafe API](https://trpc.io)
-   [Zod - TypeScript-first schema validation](https://zod.dev)
-   [Tailwind CSS](https://tailwindcss.com)
-   [TypeScript](https://typescriptlang.org)
-   [Prisma - ORM](https://prisma.io)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hiring11/FrontendDevelopment-GokhanD.git inventory-app
```

2. Install the required packages:

```bash
cd inventory-app
yarn
```

3. Set the environment variables:

Create a `.env` file in the root directory based on `.env.example` file.

4. Start Docker Daemon:

Open [Docker desktop](https://www.docker.com/products/docker-desktop/).

5. Run the application:

```bash
yarn start:dev
```

The application will be available at http://localhost:3000.

## Usage

To use the application, open your web browser and navigate to http://localhost:3000.
After that, you can add, edit, and delete your inventories.

## Scripts

-   **Run project in development mode**

```bash
yarn start:dev
```

-   **Run project in development mode (with docker-compose)**

```bash
yarn start:dev:docker
```

-   **Run project in production mode**

```bash
yarn start:prod
```

-   **Run project in production mode (with docker-compose)**

```bash
yarn start:prod:docker
```

## Pipeline

The application is deployed to Vercel automatically when a pull request is merged to the `main` branch.

## Tests

The application is tested automatically using [Vitest](https://vitest.dev).
To run the tests, run the following command:

```bash
yarn test
```

## Contributing

If you would like to contribute to the Inventory App project, please fork the repository and submit a pull request.
Before submitting a pull request, please make sure to run the tests and ensure that they pass.

## License

The Inventory App is released under the [MIT License](https://opensource.org/license/mit/).
