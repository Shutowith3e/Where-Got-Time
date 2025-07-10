import express, { Router } from 'express';
import cors from "cors";
import env from "dotenv";
import serverless from "serverless-http";
import authJWT from '../middleware/auth.js';
import mCheckAdmin from '../middleware/checkAdminMiddleware.js';
import groupRoutes from '../routers/groupRouter.js';
import eventRoutes from '../routers/eventRouter.js';
import userRoutes from '../routers/userRouter.js';
import adminRoutes from '../routers/adminRouter.js';


env.config();

const app = express();

// for parsing JSON bodies
app.use(express.json());

// for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// this allows all origins
app.use(cors());
app.options("*", cors());


// import middleware for auth
app.use(authJWT); // all routes after this needs a jwt in the auth header to work

// import and use exported routes from groupRouter 
const allRoutes = Router();

allRoutes.use('/groups', groupRoutes);
allRoutes.use('/events', eventRoutes);
allRoutes.use('/users', userRoutes);
//import middleware for admin verification
allRoutes.use('/admins', mCheckAdmin, adminRoutes)

app.use('/api', allRoutes)
// check if server is running
//app.listen(8000, () => console.log('Server running on port 8000'));
export const handler = serverless(app, {
  request: (req, event, context) => {
    if (event.body && typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (e) {
      }
    }
    return req;
  }
})
