## Fitness Tracker MVP: API Documentation

This document outlines the API endpoints for the Fitness Tracker MVP, a web application designed to empower users to achieve their fitness goals through goal setting, progress tracking, and a supportive community.

### 1.  API Endpoint Design

The Fitness Tracker API follows a RESTful architecture, using standard HTTP methods and JSON for data exchange.  Each API endpoint is defined with a specific URL path and HTTP method.

**Endpoints:**

| Endpoint                  | HTTP Method | Description                                                                                                                        |
|---------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `/auth/register`          | POST         | Register a new user.                                                                                                                |
| `/auth/login`             | POST         | Login an existing user.                                                                                                               |
| `/goals`                  | POST         | Create a new fitness goal for the current user.                                                                                   |
| `/goals`                  | GET          | Retrieve a list of all goals for the current user.                                                                                  |
| `/goals/:goalId`          | GET          | Retrieve a specific goal by its ID.                                                                                               |
| `/goals/:goalId`          | PUT          | Update an existing goal based on its ID.                                                                                             |
| `/goals/:goalId`          | DELETE       | Delete a goal by its ID.                                                                                                         |
| `/progress`               | POST         | Log progress towards a specific goal.                                                                                               |
| `/progress`               | GET          | Retrieve all progress entries for the current user.                                                                                |
| `/community`              | POST         | Create a new community post for the current user.                                                                                   |
| `/community`              | GET          | Retrieve the community feed of recent user activities.                                                                              |
| `/community/:feedItemId`    | PUT          | Update an existing community post.                                                                                              |
| `/community/:feedItemId`    | DELETE       | Delete a community post.                                                                                                        |
| `/users/:userId`          | GET          | Retrieve user profile information for the specified user ID.                                                                           |
| `/users/:userId`          | PUT          | Update the user profile for the specified user ID.                                                                               |

**Data Formats:**

- All requests and responses utilize JSON as the data format.

**Authentication:**

- The API uses JWT (JSON Web Token) authentication for protecting endpoints.
- All protected endpoints require a valid JWT token included in the `Authorization` header as `Bearer TOKEN`.
- Tokens are issued upon successful user registration or login.

### 2.  Error Handling

The API employs standard HTTP status codes and JSON error responses for error handling. 

**Error Responses:**

- **400 Bad Request:**  Invalid or missing request data.
- **401 Unauthorized:**  Missing or invalid authentication token.
- **403 Forbidden:**  Unauthorized access attempt.
- **404 Not Found:**  The requested resource was not found.
- **500 Internal Server Error:**  An error occurred while processing the request.

**Error Response Structure:**

```json
{
  "error": "Error message"
}
```

**Example:**

```json
{
  "error": "Invalid email or password"
}
```

### 3.  API Endpoint Implementation

The API endpoints are implemented using a combination of Next.js API routes and Express.js for handling HTTP requests.  

**Example (`src/presentation/pages/api/goals/route.ts`):**

```javascript
// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { GoalService } from '../../../../core/application/services/goalService';
import { GoalMapper } from '../../../../infrastructure/gateways/api/GoalMapper';
import { prisma } from '../../../../infrastructure/adapters/database/prisma/prisma';
import { Goal } from '../../../../core/domain/entities/goal/Goal';
import { GoalType } from '../../../../types/goal';

// Initialize services and mapper
const goalService = new GoalService();
const goalMapper = new GoalMapper();

// Define the API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the user session from the request
  const session = await getSession({ req });

  // Check if the user is authenticated
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the user ID from the session
  const userId = session.user.id;

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        // Fetch goals from the service
        const goals = await goalService.getGoals(userId);
        // Map goals to API response format
        const responseGoals = goals.map((goal) => goalMapper.toApiResponse(goal));
        // Send the response with the goals data
        res.status(200).json(responseGoals);
      } catch (error) {
        console.error('Error getting goals:', error);
        res.status(500).json({ error: 'Failed to retrieve goals' });
      }
      break;

    case 'POST':
      try {
        // Get goal data from the request body
        const goalData: { type: GoalType; targetValue: number; deadline: Date } = req.body;
        // Map goal data to the Goal entity
        const goal: Goal = goalMapper.toDomainObject({ ...goalData, userId });
        // Create the goal using the service
        const createdGoal = await goalService.createGoal(goal);
        // Map the created goal to API response format
        const responseGoal = goalMapper.toApiResponse(createdGoal);
        // Send the response with the created goal
        res.status(201).json(responseGoal);
      } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: 'Failed to create goal' });
      }
      break;

    case 'PUT':
      try {
        // Get the goal ID from the request query parameter
        const goalId = req.query.id as string;
        // Get goal data from the request body
        const goalData: Partial<Goal> = req.body;
        // Update the goal using the service
        await goalService.updateGoal(goalId, goalData);
        // Send an empty response with a 204 status code
        res.status(204).send();
      } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ error: 'Failed to update goal' });
      }
      break;

    case 'DELETE':
      try {
        // Get the goal ID from the request query parameter
        const goalId = req.query.id as string;
        // Delete the goal using the service
        await goalService.deleteGoal(goalId);
        // Send an empty response with a 204 status code
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Failed to delete goal' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
```

**Implementation Details:**

- The API routes handle different HTTP methods for each endpoint, using `switch` statements. 
- Authentication is checked using `getSession` from NextAuth.js.
- Data is validated and transformed using the `GoalMapper` class. 
- Each route calls the corresponding methods in `goalService` for business logic.
- Error handling is implemented using `try/catch` blocks and sending appropriate HTTP status codes and JSON error responses.

### 4.  API Documentation

The API documentation is generated using Swagger, which provides a user-friendly interface for exploring and testing the API endpoints.  

**Configuration (`src/config/api.ts`):**

```javascript
// ... (Import statements and configuration)

// Define API routes for goals
const router = Router();

// ... (Goal creation, retrieval, update, deletion logic)

// Export the API router
export default router;
```

**Integration:**

- The `router` object is used to define the API routes and map them to corresponding controllers.
- The API documentation is generated based on the defined routes and controllers using Swagger's configuration.

### 5. Security Considerations

- The API is protected using JWT authentication to prevent unauthorized access. 
- Input validation and sanitization are implemented in controllers and use cases to mitigate common vulnerabilities like XSS and SQL injection. 
-  Error handling is robust, providing specific error messages and HTTP status codes to help with troubleshooting and debugging.

### 6.  Performance Optimization

The API endpoints are designed for optimal performance, utilizing caching strategies, efficient algorithms, and optimized database interactions.

**Performance Optimization Techniques:**

- **Caching:**   Consider using in-memory caching for frequently accessed data (e.g., using a caching library like `cache-manager`) to reduce database queries.
- **Database Optimization:**  Ensure the database schema is optimized for performance, including appropriate indexes.
- **Efficient Algorithms:**  Use efficient algorithms for data manipulation and processing.
- **Asynchronous Operations:**  Use asynchronous operations for tasks that don't require immediate results, improving responsiveness.

### 7. Scalability Considerations

The API is designed for scalability, utilizing a layered architecture and robust infrastructure for handling increasing user load and data volume.

**Scalability Strategies:**

- **Layered Architecture:** The layered architecture allows for modular scaling of different components as needed.
- **Database Scalability:**  Utilize a managed database service like Supabase or consider database sharding as the application grows.
- **API Gateway:**  Consider using an API gateway for load balancing and managing API requests.
- **Microservices Architecture:**  For larger applications, consider moving to a microservices architecture to further enhance scalability and modularity.

### Conclusion

This documentation provides a comprehensive overview of the Fitness Tracker API, including its design principles, implementation details, error handling, security considerations, performance optimization techniques, and scalability strategies. By adhering to these guidelines and using a robust technology stack, the API provides a solid foundation for a successful and scalable fitness application.