const defaultError = (req, res, next) => {
  res.render("error", { mesage: "Page not found!" });
};

export default defaultError;
