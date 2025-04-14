# User Stories & Acceptance Tests

## Sprint 1: Authentication & User Onboarding

### Admin Login
**User Story**:  
As an admin, I want to log in so that I can manage the platform.  
**UAT**:  
Given I am an admin and I have valid credentials, when I enter my email and password and click login, then I should be redirected to the admin dashboard.

---

### Client Login
**User Story**:  
As a client, I want to log in so that I can manage my projects and hire freelancers.  
**UAT**:  
Given I am a registered client with correct login details, when I submit my credentials on the login page, then I should be taken to the client dashboard.

---

### Freelancer Login
**User Story**:  
As a freelancer, I want to log in so that I can access job postings and manage my tasks.  
**UAT**:  
Given I am a freelancer and I have a valid account, when I log in with my email and password, then I should be navigated to the freelancer dashboard.

---

### General User Signup
**User Story**:  
As a user, I want to sign up so that I can access the platform as a client or freelancer.  
**UAT**:  
Given I am a new user, when I provide my details and select my role (client or freelancer), then my account should be created and I should be taken to the appropriate dashboard.

---

### Client Signup
**User Story**:  
As a client, I want to sign up so that I can post jobs and hire freelancers.  
**UAT**:  
Given I am a new user, when I choose the client role and complete the sign-up form, then my client account should be created and I should be redirected to the client dashboard.

---

### Freelancer Signup
**User Story**:  
As a freelancer, I want to sign up so that I can apply for jobs and offer my services.  
**UAT**:  
Given I am a new user, when I select the freelancer role and submit the registration form, then my freelancer account should be created and I should be taken to the freelancer dashboard.

---

### Admin Registration
**User Story**:  
As an admin, I want to register on the platform so that I can manage users and oversee activity.  
**UAT**:  
Given I have admin access or invitation, when I complete the admin registration process, then my admin account should be created and I should be redirected to the admin dashboard.


# Role-Based Dashboard Access

## Authentication Flow

### 1. Admin Dashboard Access
**User Story**:  
As an admin, I want to be redirected to the admin dashboard after successful login so I can access administrative controls immediately.  

**Acceptance Criteria**:  
- Given I'm on the login page as an admin  
- When I enter valid admin credentials and submit  
- Then I should be redirected to `/admin-dashboard`

<!--
- And I should see admin-specific controls  
- And I should not see client/freelancer features 

-->
 

---

### 2. Client Dashboard Access  
**User Story**:  
As a client, I want to automatically reach my client dashboard after login so I can quickly manage my projects.  

**Acceptance Criteria**:  
- Given I'm on the login page as a client  
- When I authenticate with valid client credentials  
- Then I should be redirected to `/client-dashboard`

<!-- 
- And I should see my active projects  
- And I should see job posting capabilities  
- And I should not see admin or freelancer tools

-->
  

---

### 3. Freelancer Dashboard Access  
**User Story**:  
As a freelancer, I want to land on my freelancer dashboard post-login so I can immediately view job opportunities.  

**Acceptance Criteria**:  
- Given I'm on the login page as a freelancer  
- When I successfully authenticate  
- Then I should be redirected to `/freelancer-dashboard`

<!-- 
- And I should see available jobs matching my skills  
- And I should see my current task progress  
- And I should not see client posting features 

-->
 

---

---
<!--

## Technical Implementation Details

### Route Protection Rules
1. **Admin Routes**:
   ```javascript
   {
     path: '/admin-dashboard',
     component: AdminDashboard,
     meta: { requiresAuth: true, role: 'admin' }
   }


## Sprint 2: Job Management & Collaboration

### Job Posting
**User Story**:  
As a client, I want to post a job so that I can find and hire a freelancer for my project.  
**UAT**:  
Given I am a logged-in client, when I fill in the job details and click "Post Job", then the job should be listed publicly for freelancers to view.

---

### Job Browsing
**User Story**:  
As a freelancer, I want to view available jobs so that I can find work that matches my skills.  
**UAT**:  
Given I am a logged-in freelancer, when I navigate to the jobs section, then I should see a list of open jobs with filters and search functionality.

---

### Job Application
**User Story**:  
As a freelancer, I want to apply for a job so that I can be considered by the client.  
**UAT**:  
Given I am viewing a job I'm interested in, when I click "Apply" and submit my proposal, then my application should be sent to the client for review.

---

### Application Review
**User Story**:  
As a client, I want to review applications so that I can choose the best freelancer for my job.  
**UAT**:  
Given freelancers have applied to my job, when I open the job details page, then I should see a list of applicants and their proposals.

---

### Hiring Process
**User Story**:  
As a client, I want to award a job to a freelancer so that we can start working together.  
**UAT**:  
Given I have reviewed the applications, when I click "Hire" on a freelancer's profile, then a contract should be created between me and the freelancer.

---

### Task Management (Freelancer)
**User Story**:  
As a freelancer, I want to view my tasks so that I can manage my workload effectively.  
**UAT**:  
Given I am logged in and have active contracts, when I go to my tasks section, then I should see a list of my assigned tasks with deadlines and statuses.

---

### Progress Tracking (Client)
**User Story**:  
As a client, I want to track task progress so that I know how my project is advancing.  
**UAT**:  
Given I have an active contract, when I open the project dashboard, then I should see task statuses and updates from the freelancer.

---

### Profile Management
**User Story**:  
As a user, I want to update my profile so that my information is accurate and up to date.  
**UAT**:  
Given I am logged in, when I go to my profile settings and edit my information, then my changes should be saved and reflected in my account.

---

### Notifications
**User Story**:  
As a user, I want to receive notifications so that I can stay informed about platform activity.  
**UAT**:  
Given an important event occurs (e.g., job offer, message, task update), when I am logged in, then I should receive a notification on the platform and optionally by email.-   

-->
