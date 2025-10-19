import * as authService from "../services/authService.js";

// Render login page
export const loginPage = (req, res) => {
  res.render("auth/login", { title: "Login", error: req.flash("error") });
};

// Handle login
export const loginUser = async (req, res) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    // Store minimal info in session
    req.session.user = { _id: user._id, name: user.name, role: user.role };
    res.redirect("/books");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/login");
  }
};

// Render registration page
export const registerPage = (req, res) => {
  res.render("auth/register", { title: "Register", error: req.flash("error") });
};

// Handle registration
export const registerUser = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.redirect("/login");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

// Logout
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect("/login");
  });
};
