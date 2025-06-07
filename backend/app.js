import express from 'express';
const app = express();

// for parsing JSON bodies
app.use(express.json()); 
// for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true })); 

// import and use exported routes from groupRouter 
import groupRoutes from './routers/groupRouter.js';
app.use('/groups', groupRoutes);

// check if server is running
app.listen(3000, () => console.log('Server running on port 3000'));

