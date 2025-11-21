export const notFoundHandler = (req, res, next) => {w
  req.flash("errors", "Page not found!");
  return res.status(404).render("error", { errors: req.flash ? req.flash("errors") : ["Page not found!"] });
};

export const globalErrorHandler = (err, req, res, next) => {
  const message = err?.message || "Something went wrong!";
  req.flash("errors", message);
  return res.status(err.status || 500).render("error", { errors: req.flash ? req.flash("errors") : [message] });
};

export default notFoundHandler;
