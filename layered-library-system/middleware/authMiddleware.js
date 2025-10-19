export const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/login");
};

export const isAdmin = (req, res, next) => {
  if (req.session.user?.role === "admin") return next();
  res.status(403).send("Forbidden");
};
