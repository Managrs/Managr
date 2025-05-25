
---

# Managr

This is a walkthrough on how to run the project locally, including both the frontend and backend.

---

## 📦 Backend: `managr-server` (Node.js)

### Prerequisites

* Node.js
* npm
* A `.env` file with the required environment variables (you can use the existing example)

### Getting Started

```bash
cd Code\managr-server
npm install
```

### Running the Backend

```bash
npm run dev
```

The backend will start on [http://localhost:8080](http://localhost:8080).

---

## 🎨 Frontend: `Managr` (Vite + Vue)

### Prerequisites

* Node.js
* npm

### Getting Started

```bash
cd Code\Managr
npm install
```

### Running the Frontend

```bash
npm run dev
```

Vite will start on [http://localhost:5173](http://localhost:5173).

---

## 🧪 Running Both Projects

To use the full application locally, **you must run both the backend and frontend at the same time in separate terminal windows** (or tabs).

Example:

1. In one terminal:

   ```bash
   cd Code\managr-server
   npm run dev
   ```

2. In another terminal:

   ```bash
   cd Code\Managr
   npm run dev
   ```

---

## 🔗 Connecting Frontend and Backend

The frontend is already configured to connect to the backend using the default API base URL:

```env
VITE_API_URL=http://localhost:8080
```

> ⚠️ You only need to change this if port `8080` is already in use on your machine.

---

## ✅ Testing (Frontend)

This project uses [Vitest](https://vitest.dev/) for unit and component testing.

### Running Tests

* To run all tests:

  ```bash
  npm run test
  ```

* To run tests in UI mode (with auto-reload):

  ```bash
  npm run test:ui
  ```

* To generate a test coverage report:

  ```bash
  npm run coverage
  ```

Tests are located in the `/test` directory and mirror the structure of the `/src` directory for maintainability.

> ✅ Be sure to install dependencies (`npm install`) before running tests, and confirm you're using a supported Node.js version.

---

## 🌐 Online Version

You can access the live version of the app here:
🔗 [https://jolly-bush-0f6975910.6.azurestaticapps.net/](https://jolly-bush-0f6975910.6.azurestaticapps.net/)

## 📊 Code Coverage

[![Codecov](https://codecov.io/gh/Managrs/Managr/branch/main/graph/badge.svg)](https://app.codecov.io/gh/Managrs/Managr)

You can view the detailed code coverage reports here:  
🔗 [https://app.codecov.io/gh/Managrs/Managr](https://app.codecov.io/gh/Managrs/Managr)

---

