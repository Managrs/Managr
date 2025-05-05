# Objectives

1. Fix the database  
2. Set up deployment of the web app on Azure  
3. Set up database connection to the deployed app  

## Fix the database

The database was giving errors related to schema mismatches and data inconsistencies. The group analyzed the existing structure, identified redundant fields, and restructured the collections to better suit the app’s goals (e.g., user roles, job applications, messaging, etc.).

- Removed redundant keys and added missing indices.
- Optimized for quick querying of users, roles, and posted jobs.

## Set up deployment of the web app on Azure

The app was deployed using Azure App Services. GitHub Actions was set up for CI/CD.  

- Ensured successful builds from the GitHub repository.  
- Deployed front-end and back-end separately with linked environments.  

## Set up database connection to the deployed app

Azure MongoDB Atlas was used as the cloud database. Connection strings and access privileges were configured in the app’s environment settings. Testing was done to verify successful API connections.

## Evidence
![Scrum Picture](1st.jpg)
