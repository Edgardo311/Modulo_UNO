const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/security");

function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Missing or invalid authorization header", 401));
  }

  try {
    req.user = verifyToken(token);
    if (!req.user.id && req.user.sub) {
      req.user.id = req.user.sub;
    }
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];
    const isAllowed = allowedRoles.some((role) => userRoles.includes(role));
    if (!isAllowed) {
      return next(new AppError("Forbidden", 403));
    }
    return next();
  };
}

module.exports = {
  authenticate,
  authorizeRoles,
};