
---

## 🗂️ Project Structure: Frontend (`Managr`)

The frontend is a Vue 3 + TypeScript application built with Vite. It uses **Pinia** for state management, **Firebase** for authentication, and **Vitest** for testing. The structure promotes modularity and scalability with a clear separation of concerns.

```
Managr/
├── .vscode/                 # VSCode workspace settings
├── coverage/                # Test coverage reports
├── node_modules/            # Project dependencies
├── public/                  # Static assets (e.g., icons, favicon)
├── src/                     # Main source code
│   ├── assets/              # Images, fonts, global styles
│   ├── components/          # Reusable Vue components
│   ├── firebase/            # Firebase config and authentication
│   ├── router/              # Vue Router setup
│   ├── stores/              # Pinia stores for state management
│   ├── types/               # TypeScript type definitions
│   ├── views/               # Page-level components, organized by feature (e.g., freelance, loggings)
│   ├── App.vue              # Root Vue component
│   ├── main.ts              # Application entry point
│   ├── style.css            # Global styles
│   └── vite-env.d.ts        # Environment variable typings
├── test/                    # Vitest tests, structured to mirror `src/`
│   ├── client/
│   ├── freelance/
│   ├── Admin_Dash.test.ts
│   ├── ClientDashboard.test.ts
│   └── ...                  # Additional component/unit tests
├── .env.development         # Development environment variables
├── .env.production          # Production environment variables
├── .gitignore               # Git ignore rules
├── index.html               # Base HTML file used by Vite
├── package.json             # Project metadata, scripts, and dependencies
├── package-lock.json        # Locked versions of installed dependencies
├── README.md                # Project documentation
├── tsconfig.app.json        # TypeScript config for the app
├── tsconfig.node.json       # TypeScript config for Vite or Node-related code
├── tsconfig.json            # Base TypeScript configuration
├── tsconfig.tsbuildinfo     # TypeScript incremental build info
├── vite.config.ts           # Vite configuration
├── vite.config.d.ts         # Vite config type declarations
└── staticwebapp.config.json # Azure Static Web Apps deployment configuration
```

### Highlights

* **`src/views/`** includes feature-specific folders like `freelance/`, `loggings/`, `profileSettings/`, and `tracking/` for clear page organization.
* **`src/firebase/`** handles Firebase setup and authentication logic.
* **`src/stores/`** contains Pinia stores for shared state across components.
* **`test/`** mirrors the source structure for consistency and easier test maintenance.
* TypeScript configuration is split for app logic, node tooling, and build optimization.

---

## 🗂️ Project Structure: Backend (`managr-server`)

The backend is a Node.js application using Express, organized for clarity and scalability.

```
managr-server/
├── db/                  # Database connection scripts
├── models/              # Data models (e.g., Mongoose schemas)
├── .env                 # Environment variables (excluded from version control)
├── index.js             # Entry point; sets up server, middleware, routes, DB connection
└── package.json         # Project metadata, scripts, and dependencies
```

### Key Files and Folders

* **`db/`**: Scripts for initializing and managing the database connection.
* **`models/`**: Mongoose schemas or other data models defining your application’s data structure.
* **`.env`**: Stores environment-specific values like DB URIs, secrets, and ports (not committed to version control).
* **`index.js`**: The main entry file that sets up the Express server, applies middleware, defines routes, and connects to the database.
* **`package.json`**: Contains dependencies, script commands, and project metadata.

---
