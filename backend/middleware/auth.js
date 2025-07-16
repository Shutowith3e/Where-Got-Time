import jwt from 'jsonwebtoken';
import env from "dotenv";
env.config();
const authJWT = async (req,res,next) =>{
	const authHeader = req.header('Authorization');
	if (!authHeader) {// no auth header == no access
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Split the header to get just the token part
    const token = authHeader.split(' ')[1]; // Expects 'Bearer TOKEN_STRING'

    if (!token) {// no token == no access
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
	try{
		// verify the jwt is legit and decode it
		const decoded = jwt.verify(token,process.env.SUPABASE_JWT_SECRET);
		//throws the uid u get into req so the next route can js access using req.uid
		req.email = decoded.user_metadata.email ; //this is js how the supabase jwt is structured dw
		next(); // go to next route so for eg ur routes will look like router.get('')
	}
	catch(err){
		// user is using some fake jwt or altered smth inside
		if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token is not valid', code:"INVALID_TOKEN" });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired',code:"TOKEN_EXPIRED" });
        }
        // For any other unexpected errors
        console.error('Authentication error:', err);
        res.status(500).json({ message: 'Server error during authentication' });
	}
}
export default authJWT;