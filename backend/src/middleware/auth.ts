// src/middleware/auth.ts
export const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "Bearer testtoken") {
    req.user = { id: "mock-user-id", name: "Test User" };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
