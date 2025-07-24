import jwt from "jsonwebtoken";

// secret key to sign tokens//
const secret = process.env.JWT_SECRET;

// token expires after 2hrs//
const expiration = "2h";


// middleware----this one is the guardian at the gate---authorization checks//
export function authMiddleware(req, res, next) {

  // look for a token in three places--in the request body, query parameters, and or the headers//
  let token = req.body?.token || req.query?.token || req.headers.authorization;

// if the token is in the headers, it appears like "Bearer si8ehahioeojo3256jiojwofjoewef..etc"//
// just need to extract the token number letter part from "Bearer and the empty space after Bearer"
  if (req.headers.authorization) {
    // remove "Bearer and the empty space after it--just want the token part//
    token = token.split(" ").pop().trim();
  }

  // no token---no entry//
  if (!token) {
    return res
    .status(401)
    .json({ message: "You must be logged in to do that. "});
  }

  try {
    // verify the token is real and not expired//
    const { data } = jwt.verify(token, secret, { maxAge: expiration });

    // if token is valid, attach user info to the request//
    req.user = data; 

  } catch {
    // token is fake or expired//
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token." }); 
  }
// next means all worked well and can go to the next function//
  next();

}

// this function makes or creates the tokens//
export function signToken({ username, email, _id }) {

  // put user info in the token//
  const payload = { username, email, _id };

  // create and return the signed token---it is not unable to be faked//
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
}