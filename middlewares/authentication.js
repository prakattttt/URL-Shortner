import jwt from "jsonwebtoken";


export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      req.flash("errors", "Please login to access admin area.");
      return res.redirect("/admin/loginPage");
    }

    jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN || process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        req.flash("errors", "Session expired or invalid. Please login again.");
        return res.redirect("/admin/loginPage");
      }

      req.user = payload;
      next();
    });
  } catch (err) {
    req.flash("errors", "Authentication failed. Please login.");
    return res.redirect("/admin/loginPage");
  }
};
