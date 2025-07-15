// CLARICE LIM OR LIM JIA LE PLEASE DO NOT ZIP THIS FILE OR NETLIFY.TOML IN FOR HUAWEI DEPLOYMENT

import cors from "cors";
import env from "dotenv";
import express, { Router } from 'express';
import serverless from 'serverless-http';

// Middleware
import authJWT from '../middleware/auth.js';
import mCheckAdmin from '../middleware/checkAdminMiddleware.js';

// Routes
import adminRoutes from '../routers/adminRouter.js';
import eventRoutes from '../routers/eventRouter.js';
import groupRoutes from '../routers/groupRouter.js';
import userRoutes from '../routers/userRouter.js';

env.config();

const app = express();

// for parsing JSON bodies
app.use(express.json());
// for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// this allows all origins, replace it before deployment
app.use(cors());

// import middleware for auth
app.use(authJWT); // all routes after this needs a jwt in the auth header to work

const allRoutes = Router();

allRoutes.use('/groups', groupRoutes);
allRoutes.use('/events', eventRoutes);
allRoutes.use('/users', userRoutes);
allRoutes.use('/admins', mCheckAdmin, adminRoutes);

app.use('/api', allRoutes);

// export the app for serverless deployment
export const handler = serverless(app, {
  request: (req, event, context) => {
    if(event.body && typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch(e) {
        // Leave it as is if it’s not JSON
      }
    }
    return req;
  }
});