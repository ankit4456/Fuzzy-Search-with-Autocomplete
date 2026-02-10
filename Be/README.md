# Backend API - Fuzzy Search

Express.js backend server with MongoDB and Fuse.js for fuzzy search functionality.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI

# Seed database
npm run seed

# Start server
npm start
# Or for development
npm run dev
```

## API Endpoints

- `GET /api/search?q=keyword` - Search items
- `GET /api/search/item/:id` - Get item by ID
- `GET /api/health` - Health check

See main README.md for detailed API documentation.

