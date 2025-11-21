import jwt from "jsonwebtoken";

export const renderLoginPage = (req, res) => {
  try {
    const errors = req.flash ? req.flash("errors") : [];
    res.render("login", { errors });
  } catch (err) {
    res.status(500).render("error", { errors: [err.message || "something went wrong!"] });
  }
};

export const loginUser = (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      req.flash("errors", "Please enter a code!");
      return res.redirect("/admin/loginPage");
    }
    if (code !== process.env.ADMIN_CODE) {
      req.flash("errors", "Invalid code!");
      return res.redirect("/admin/loginPage");
    }
    const token = jwt.sign({ role: "admin" }, process.env.ADMIN_ACCESS_TOKEN || process.env.JWT_SECRET, {
      expiresIn: "30m",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000, 
      sameSite: "strict",
    });
    return res.redirect("/url/admin/database"); 
  } catch (err) {
    req.flash("errors", "Login failed. Try again.");
    return res.status(500).redirect("/admin/loginPage");
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });
    return res.redirect("/url/");
  } catch (err) {
    return res.status(500).render("error", { errors: [err.message || "something went wrong!"] });
  }
};
