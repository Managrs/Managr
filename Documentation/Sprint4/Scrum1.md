# Scrum 1
## Objectives

1. Admin can view list of users
2. Set up user roles and data access for admin

### Admin can view list of users

We implemented a feature that allows the admin to view a list of all users (clients and freelancers) registered on the web app.

- The backend endpoint `/admin/users` was created to retrieve all user data.
- The frontend dashboard now displays the users in a paginated table.
- Admin can view user name, email, role (client/freelancer), and registration date.
- Access to this route is restricted via middleware authentication.

### Set up user roles and data access for admin

To protect data and ensure appropriate access control, we established user roles and access rules:

- Roles defined: Admin, Client, Freelancer.
- Middleware added to backend to check roles before accessing sensitive data.
- Admin role assigned special privileges using a `role` field in the MongoDB user schema.

## Evidence

![Scrum 1 Evidence](pic1.jpg)

