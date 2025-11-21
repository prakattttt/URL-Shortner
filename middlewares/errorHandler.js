const defaultError = (req, res, next) => {
  res.render("error",  req.flash("errors", "Page not found!"));
};

export default defaultError;
