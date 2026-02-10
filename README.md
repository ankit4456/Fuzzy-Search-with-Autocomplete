# Fuzzy Search with Autocomplete - MERN Stack Application

I have successfully implemented a full-stack MERN application with intelligent fuzzy search and real-time autocomplete functionality.

---

## KEY FEATURES

✅ React search bar with real-time autocomplete suggestions (300ms debounce)  
✅ Fuzzy search using Fuse.js library handling typos and partial words  
✅ MongoDB text indexes on name, description, category, and tags  
✅ Express.js REST API endpoint returning top 10 relevant suggestions  
✅ Smart relevance sorting prioritizing exact matches  
✅ Interactive dropdown with keyboard navigation  
✅ Item detail pages with navigation  
✅ Responsive design for all devices  

---

## TECHNICAL STACK

**Frontend:** React.js, Axios, React Router  
**Backend:** Node.js, Express.js, Mongoose  
**Database:** MongoDB Atlas with text indexes  
**Search:** Fuse.js fuzzy matching (threshold: 0.4, field weights optimized)

---

## SEARCH ALGORITHM

- Fuse.js with Levenshtein distance for fuzzy matching
- Field weights: Name (70%), Description (20%), Category (5%), Tags (5%)
- Custom relevance scoring for exact/prefix matches
- Returns top 10 results sorted by relevance

---

## DATASET

- 88 indexed items across 8 categories:
  Electronics, Appliances, Footwear, Accessories, Furniture, Fitness, Stationery, Home & Garden

---

## DEPLOYMENT

- **Frontend:** Live on Vercel (Production deployment)
- **Backend:** Live on Railway (Node.js Web Service)
- **Database:** MongoDB Atlas (Cloud)
- Frontend and backend connected via hosted API routing

---

## API CONNECTION CONFIGURATION

The frontend communicates with the backend using Axios with environment-based routing:

```js
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'https://be-production-094a.up.railway.app/api';
