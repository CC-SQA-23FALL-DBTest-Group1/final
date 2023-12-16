# Group 1 - SENG8070 – Fall 2023 – Final

### Group Members:
- Xingru Yao 8854848
- Yaonan Deng 8852616
- Tikkisetty Keerthana 888969

## Project Overview: Persistence-Service

### Goal
This project serves as a comprehensive demonstration of various concepts covered in SENG8070.

## Getting Started: Environment Requirements

### *Prerequisites:*
- Node.js and NPM installed. [Download Page of Nodejs](https://nodejs.org/en/download/)
- Docker installed (for certain tests).[Official Website](https://docs.docker.com/get-docker/)

### *Quick Start:*
1. Make sure docker engine is running.
2. Open a terminal, go to `integration-tests` diretory.
3. Run command:
   ```bash
   docker compose up
   ```
   NOTE: This sets up the docker containers as server and adds 3 rows of records into the database(Migration).Then the test runs automatically. The result file will be generated under `integration-tests/results` folder.
### *Tests*

- This project uses Node.Js for backend development, TypeScript for coding, and Jest as the primary testing framework.
- It includes unit tests and integration tests to cover various scenarios.
- Ensure Docker is installed for specific integration tests.

#### *Unit Test*
1. Verify if Node and NPM are installed:
    ```bash
    node -v
    ```
    ```bash
    npm -v
    ```
2. Open a terminal, go to `persistence-service/backend` diretory.
3. Run commands:
   ```bash
   npm install
   ```
   ```bash
   npm run test
   ```
4. Wait for the result.

#### *Integration Test(Manual)*
1. Verify if Node and NPM are installed:
```bash
node -v
```
```bash
npm -v
```
2. Make sure docker engine is running.
3. Open a terminal, go to `persistence-service/backend` diretory.
4. Run command:
   ```bash
   docker compose up --build
   ```
5. Use any text editor to change the file: `integration-tests/src/Config.ts`.
6. Use the `localhost` instead of `process.env.TARGET_URL`.
   ```Typescript
   export function targetURL() {
       //const targetUrl = `${process.env.TARGET_URL}`;
       const targetUrl = `localhost`;
       return targetUrl;
   }
   ```
7. Open a new terminal, go to `integration-tests/` diretory.
8. Run commands:
   ```bash
   npm install
   ```
   ```bash
   npm run t
   ```
9. Wait for the result.
