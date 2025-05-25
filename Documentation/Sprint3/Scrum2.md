# Scrum 2

# Objectives

1. User can report issues  
2. Admin can view a list of users  
3. Admin can filter users by role (client/freelancer)

## User can report issues

Users now have access to a "Report an Issue" button available on all major pages of the app.  

- Users can submit a report by filling a form.
- Data is stored in the "reports" collection in MongoDB.
- Admins can access and review these reports.

## Admin can view a list of users

A new page was developed for the Admin dashboard to show all registered users.

- Displays each user’s name, email, and role.
- Linked to the backend route `/admin/users`.

## Admin can filter users by role (client/freelancer)

The Admin view now includes filters to sort users by type:

- Two toggle buttons: "Show Clients" and "Show Freelancers".
- Added backend logic to filter using MongoDB queries.

## Evidence
![Scrum Picture](2nd.jpg)
