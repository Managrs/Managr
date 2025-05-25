# Scrum 2
## Objectives

1. Admin can access report dashboard
2. Display system stats and user activity

### Admin can access report dashboard

A dedicated dashboard was developed for the admin to monitor overall system activity and generate reports.

- Dashboard contains charts and tables summarizing recent platform activity.
- Backend analytics route `/admin/reports` created to fetch required metrics.
- Admin can select date ranges to generate custom reports.

### Display system stats and user activity

The admin report dashboard includes the following metrics:

- Total users (active and inactive)
- Number of jobs posted and completed
- Applications submitted over time
- New user registrations per day/week
- Most active clients and freelancers
- Report generation currently uses static dummy data (live data integration planned in next sprint)

## Evidence

![Scrum 2 Evidence](pic2.jpg)
