# Problem Statement
## Healthcare Appointment Booking System (Extension)

You are required to further extend the **Healthcare Appointment Booking System** with a comprehensive set of features that enhance **performance**, **real-time interactivity**, **user communication**, **data maintenance**, and **system resilience**. This extension will incorporate **Redis caching**, **event handling and streaming**, **WebSocket notifications**, **email notifications with retry mechanisms**, **automated tasks with cron jobs**, **real-time analytics**, and **data cleanup** to create a high-performance and user-centric application.

### Functional Requirements:

1. **Redis Caching and Optimized Invalidation**:
- Integrate **Redis** to cache frequently accessed data and reduce database load.
- **Data to Cache**:
- **Doctors List**: Cache the list of doctors to reduce MongoDB queries for frequently requested data.
- **Patient Profiles**: Cache patient profiles.
- Implement **cache expiration** to refresh data periodically (e.g., doctors list cache expires every 5 minutes).
- **Advanced Cache Invalidation**:
- **Doctor Availability Updates**: Invalidate the doctors list cache whenever availability changes.
- **Patient Profile Updates**: Invalidate cache entries when profiles are updated.
- Use **cache key patterns** to manage selective invalidation for better cache management.
2. **Event Handling & Real-Time Streaming**:
- Use **Node.js events** to handle key system actions asynchronously.
- **Appointment Status Change Events**:
- Trigger an event when an appointment’s status changes (e.g., from `pending` to `approved` or `rejected`) and log these changes.
- **Real-Time Streaming Endpoint**:
- Set up a streaming endpoint to broadcast live appointment status updates to users and admins in real-time.
3. **WebSocket Notifications & Real-Time Features**:
- Implement **real-time notifications** using **WebSockets** ([[Socket.io](http://socket.io/)](http://socket.io/)) for important events:
- **Appointment Confirmation**: Notify users when an appointment is confirmed or rejected.
- **Appointment Reminders**: Send a reminder notification 15 minutes before a scheduled appointment.
- **WebSocket Endpoint**: `/notifications` to connect users for receiving real-time updates.
- **Real-Time Chat**:
- Enable real-time chat between patients and doctors using **WebSockets**.
- **Route**: `/chat/connect` to establish a chat session for authenticated users.
- **Store Chat History**: Keep a record of chat history associated with each appointment for future reference.
4. **Email Notifications with Retry Mechanism**:
- Set up **email notifications** for critical events using **NodeMailer**:
- **Appointment Confirmation Email**: Send an email when an appointment is confirmed or rejected.
- **Appointment Reminder Email**: Send a reminder email 1 day before the appointment.
- **Retry Mechanism** for Failed Emails:
- If an email fails to send, implement a retry mechanism with a maximum of 3 attempts.
- Log any failed notifications after retries and track their status on the monitoring dashboard.
5. **Scheduled Tasks with Cron Jobs**:
- Set up **cron jobs** to automate essential tasks at specified intervals:
- **Daily Appointment Summary for Admins**: Send a daily summary email to admins, listing counts of approved, pending, and rejected appointments.
- **Hourly Appointment Reminders**: Schedule a job to check for appointments within the next 24 hours and send reminders.
- **Data Cleanup & Maintenance**:
- * Automate Automated data Deletion cleanup of tasks Outdated to Data: delete outdated appointments and chat histories older than a specified period (e.g., 1 year).
- Clear Redis cache entries for inactive users to conserve memory.
- **Outdated Regularly Appointments:** archive Delete old appointments logs older and than create 1 backups year to from optimize the data database management. to maintain relevant data and improve system performance.
6. **Real-Time Analytics for Admins**:
- * Develop Redis a Cache **real-time Cleanup analytics for endpoint** Inactive for Users: admin users, providing essential data insights for better decision-making.
- **Metrics to Display**:
- **Short-Term Total Inactivity:** count Automatically of clear approved, Redis pending, cache and entries rejected for appointments. users who have been inactive for 10 minutes to conserve memory and optimize performance.
6. - **Real-Time Most Analytics active for doctors Admins**: and patients.
- Trends Develop in a appointment **real-time demand analytics (e.g., endpoint** peak for times). admin users, providing essential data insights for better decision-making.
- **WebSocket **Metrics Integration**: to Use Display**: WebSockets to provide live updates for these metrics to active admin sessions.
- Total count of approved, pending, and rejected appointments.
--- - Most active doctors and patients.
- Trends in appointment demand (e.g., peak times).

### Submission Guidelines:
#### 1. Source Code Repository:
* Submit your masai repo with well-organized, modular codebase utilizing Redis, WebSockets, and cron jobs effectively.
#### 2. API Documentation:
* Provide detailed API documentation (using Swagger or Postman) covering all new endpoints for chat, real-time analytics, notifications, and data cleanup.
#### 3. [README.md](http://readme.md/):
* Include detailed setup instructions for Redis, WebSocket configuration, cron jobs, and monitoring.
