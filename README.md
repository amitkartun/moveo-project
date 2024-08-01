# Code Collaboration Platform

# Frontend

## Lobby Page (Home Page)

### Components

- **Header**: Title "Choose code block"
- **List component**: Display code block item for each block in the list

### Functionality

- Fetch and display the list of code blocks from the backend
- Handle click events on code block items
- Navigate to the Code Block Page when an item is clicked

### Local state management

- Store the list of code blocks
- Track loading state while fetching code blocks

## Code Block Page

### Components

- **Header**: Display the selected code block title
- **Role indicator**: Show the user role (mentor or student)
- **Code editor component**: Read-only for mentor, editable for student
- **"Back to Lobby" button**
- **Successful Solution component**: Shows smiley when code equals solution

### Functionality

- Fetch specific code block data from the backend
- Implement real-time code synchronization using WebSockets
- Apply syntax highlighting to the code (using CodeMirror)
- Handle code changes for the student role
- Prevent editing for the mentor role

### Local state management

- Store the current code block data
- Track the user's role (mentor or student)
- Manage the WebSocket connection state
- Track loading state while fetching code blocks

## Styling

- Responsive design for various screen sizes
- Consistent color scheme and typography
- Styling for the code editor (including syntax highlighting)

## Routing

- Set up routes for the Lobby Page and Code Block Page
- Handle passing of code block ID to the Code Block Page

## Services/Utilities

- **API service**: Make REST requests to the backend
- **WebSocket service**: Real-time communication

## Error Handling

- Implement error boundaries for catching and displaying errors
- Handle network errors and display appropriate messages
- Handle Not found page (404) for wrong URL

## Build and Deployment

- Set up build process for production

# Backend

## Server Setup

- **Express.js application setup**
- **Middleware configuration**: e.g., body-parser
- **Error handling middleware**
- **Environment configuration**: Store connection string to DB

## Database Connection

- **MongoDB connection setup**
- **Database models**: Code Block model
- **Initial data seed**: Handle initial data using seed script

## API Routes

- **GET /api/codeblocks**: Retrieve list of all code blocks
- **GET /api/codeblocks/:id**: Retrieve a specific code block

## Controllers

- **CodeBlockController**:
  - `getCodeBlocks()`: Retrieve all code blocks
  - `getCodeBlock(id)`: Retrieve a specific code block

## Models

- **CodeBlock**:
  - `_id`: ObjectID
  - `title`: String
  - `code`: String
  - `solution`: String

## WebSocket Setup

- **Integration with Socket.io**
- **Event handlers**:
  - Client connection
  - Code change events
  - Disconnection

## Real-time Communication Logic

- Room creation for each code block
- Broadcasting code changes to all clients in a room
- Handling different roles (mentor/student) in a room

# Future Enhancements and Optimizations

The following actions are identified as potential enhancements to optimize the current solution but have not been implemented due to time constraints:

# Backend

## Logging

- Request logging
- Error logging
- WebSocket event logging
- Inform student when mentor leaves the room

## Testing

- Unit tests for controllers and models
- Integration tests for API endpoints
- WebSocket communication tests

## Security Measures

- CORS configuration

## API Documentation

- API documentation

# Frontend

## Performance Considerations

- Implement lazy loading for the Code Block Page
- Optimize re-renders, especially for real-time updates

## Testing

- Set up unit tests for components
- Implement integration tests for page functionality
