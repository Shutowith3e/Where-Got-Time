import express, { Router } from 'express';
import cors from "cors";
import env from "dotenv";
import serverless from "serverless-http";

env.config();

const app = express();


// for parsing JSON bodies
app.use(express.json());

// this allows all origins, replace it before deployment
app.use(cors());
app.options("*", cors());

// replace it with this! 
// app.use(cors({
//   origin: "http://localhost:3000", 
//   credentials: true
// }));


// for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// import middleware for auth
import authJWT from '../middleware/auth.js';
app.use(authJWT); // all routes after this needs a jwt in the auth header to work

// import and use exported routes from groupRouter 
const allRoutes = Router();
import groupRoutes from '../routers/groupRouter.js';
import eventRoutes from '../routers/eventRouter.js';
import userRoutes from '../routers/userRouter.js';
import adminRoutes from '../routers/adminRouter.js';

allRoutes.use('/groups', groupRoutes);
allRoutes.use('/events', eventRoutes);
allRoutes.use('/users', userRoutes);

//auth test route, delete later
import authrouter from '../authtest.js';
allRoutes.use('/test', authrouter);

//import middleware for admin verification
import mCheckAdmin from '../middleware/checkAdminMiddleware.js';

allRoutes.use('/admins', mCheckAdmin, adminRoutes)
app.use("/api", allRoutes)
// check if server is running
//app.listen(8000, () => console.log('Server running on port 8000'));
export const handler = serverless(app, {
  request: (req, event, context) => {
    if (event.body && typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (e) {
        // Leave it as is if it’s not JSON
      }
    }
    return req;
  }
})
