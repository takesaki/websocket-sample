# Fireblocks Webhook Sample

This project demonstrates a webhook implementation for websocket, consisting of a client and server component. The server is built with Node.js and TypeScript, while the client provides a user interface for interacting with the webhook system.

## Project Structure

```
.
├── client/          # Client application
├── server/          # Server application
│   ├── public/      # Static files
│   ├── src/         # Source code
│   ├── tests/       # Test files
│   └── Dockerfile   # Docker configuration
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (optional)

## Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production build:
   ```bash
   npm run build
   ```

### Docker Support

The server can be run using Docker:

```bash
docker build -t fireblocks-webhook .
docker run -p 3000:3000 fireblocks-webhook
```

## Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- Webhook endpoint for Fireblocks integration
- Real-time WebSocket support
- CORS enabled
- Security headers with Helmet
- TypeScript support
- Jest testing framework
- Docker containerization

## Development

- The server uses TypeScript for type safety
- Hot reloading is enabled during development
- Tests can be run with `npm test`

## API Endpoints

- WebSocket endpoint: `/ws`

## Security

- CORS is configured for secure cross-origin requests
- Helmet is used for security headers
- Production builds are optimized and minified

## License

ISC 