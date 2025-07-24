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

  if (!token) {
    return res
    .status(401)
    .json({ message: "You must be logged in to do that. "});
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data; 
  } catch {
    console.log("Invalid token");
    return res.status(401).json({ message: "Invalid token." }); 
  }

  next();

}

export function signToken({ username, email, _id }) {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
}