# **Job Search App**

## **Overview**

The Job Search App is designed to simplify the process of finding jobs for candidates and managing job postings for companies. It features advanced filtering, seamless data management, and an intuitive application process.

## **Features**

- **Advanced Filters**: Allows users to search for jobs based on criteria like job title, location, working time, seniority level, and skills.
- **User and Company Management**: Handles secure data management for both job candidates and companies.
- **Job Applications**: Facilitates easy job applications.

## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose for MongoDB object data modeling
- **Authentication & Authorization**: JWT for secure user authentication and role-based access control
- **Email Service**: Nodemailer for sending emails
- **Validation**: Joi for input validation
- **Deployment**: Backend deployed on Vercel

## **API Documentation**

### **User APIs**

- **Sign Up**: Create a new user account.
- **Sign In**: Log in using email, recovery email, or mobile number.
- **Update Account**: Modify user details (email, mobile number, etc.).
- **Delete Account**: Remove user account data.
- **Get Account Data**: Retrieve the logged-in user's account details.
- **Get Another User's Profile**: View profile data for another user.
- **Update Password**: Change user password.
- **Forget Password**: Recover a forgotten password.

### **Company APIs**

- **Add Company**: Create a new company profile.
- **Update Company Data**: Modify company details.
- **Delete Company Data**: Remove company profile.
- **Get Company Data**: Retrieve details of a specific company.
- **Search Company by Name**: Find a company using its name.
- **Get Job Applications**: View applications for jobs posted by the company.

### **Job APIs**

- **Add Job**: Post a new job listing.
- **Update Job**: Modify existing job details.
- **Delete Job**: Remove a job listing.
- **Get All Jobs**: Retrieve all job listings with company details.
- **Get Jobs by Company**: Find all jobs posted by a specific company.
- **Filter Jobs**: Search jobs based on criteria like working time, location, seniority level, and skills.
- **Apply to Job**: Submit an application for a job.

## **Installation**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/job-search-app.git
   cd job-search-app

2. **Install Dependencies**
   ```bash
   npm install
3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=5000
   CONNECTION_DB_URI=mongodb+srv://Ayat237:g6qC9RBZPkjOEh95@jop-searchapp.2cgmz.mongodb.net/
   LOGIN_SECRET=accessSignature
   CONFIRM_SECRET=confirmedSignature
   SALT_ROUND=8

5. **Run the Application Locally**
   ```bash
   npm start
The app will be running at http://localhost:5000.
## **Deployment**
The backend is deployed on Vercel and can be accessed at:
[https://job-searching-app-silk.vercel.app/](https://job-searching-app-silk.vercel.app/)
