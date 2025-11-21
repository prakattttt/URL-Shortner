import jwt from "jsonwebtoken";

export const renderLoginPage = (re, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const loginUser = (req, res) => {
  try {
    const { code } = req.body;
    if (!code)
      return res.redirect("/admin/login", req.flash("errors", "Please enter a code!"));
    if (code !== process.env.ADMIN_CODE)
      return res.redirect("/admin/login", req.flash("errors", "Invalid code!"));
    const token = jwt.sign({ code }, process.env.ADMIN_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.redirect("/url/admin/database");
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", null, {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });
    res.redirect("/url/");
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};
