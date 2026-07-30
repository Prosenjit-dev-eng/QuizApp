import { useState, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Award, LogIn, LogOut, X, Menu } from "lucide-react";
import QuizLogo from "../assets/Quizlogo.png";
function Navbar({ logoSrc }) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem("authToken"));
    } catch {
      return false;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect hook to show the login state change
  useEffect(() => {
    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      setLoggedIn(Boolean(detailUser));
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);

  // Logout function
  const handleLoggedOut = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.clear();
    } catch {
      // Ignore all the error
    }
    window.dispatchEvent(
      new CustomEvent("authChanged", { detail: { user: null } }),
    );
    setMenuOpen(false);
    try {
      navigate("/login");
    } catch {
      window.location.href = "/login";
    }
  };
  return (
    <nav className={navbarStyles.nav}>
      <div
        style={{
          backgroundImage: navbarStyles.decorativePatternBackground,
        }}
        className={navbarStyles.decorativePattern}
      ></div>
      <div className={navbarStyles.bubble1}></div>

      <div className={navbarStyles.bubble2}></div>

      <div className={navbarStyles.bubble3}></div>

      <div className={navbarStyles.container}>
        <div className={navbarStyles.logoContainer}>
          <Link to="/" className={navbarStyles.logoButton}>
            <div className={navbarStyles.logoInner}>
              <img
                src={
                  logoSrc ||
                  QuizLogo
                }
                alt="QuizMaster logo"
                className={navbarStyles.logoImage}
              />
            </div>
          </Link>
        </div>
        <div className={navbarStyles.titleContainer}>
          <div className={navbarStyles.titleBackground}>
            <h1 className={navbarStyles.titleText}>Quiz Maniac Quiz App</h1>
          </div>
        </div>

        <div className={navbarStyles.desktopButtonsContainer}>
          <div className={navbarStyles.spacer}></div>
            <NavLink to="/result" className={navbarStyles.resultsButton}>
              <Award className={navbarStyles.buttonIcon} />
              My Result
            </NavLink>
            {loggedIn ? (
              <button
                onClick={handleLoggedOut}
                className={navbarStyles.logoutButton}
              >
                <LogOut className={navbarStyles.buttonIcon} />
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={navbarStyles.loginButton}>
                <LogIn className={navbarStyles.buttonIcon} />
                Login
              </NavLink>
            )}
           </div>
          <div className={navbarStyles.mobileMenuContainer}>
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className={navbarStyles.menuToggleButton}
            >
              {menuOpen ? (
                <X className={navbarStyles.menuIcon} />
              ) : (
                <Menu className={navbarStyles.menuIcon} />
              )}
            </button>
            {menuOpen && (
              <div className={navbarStyles.mobileMenuPanel}>
                <ul className={navbarStyles.mobileMenuList}>
                  <li>
                    <NavLink
                      to="/result"
                      className={navbarStyles.mobileMenuItem}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Award className={navbarStyles.mobileMenuIcon} />
                      My result
                    </NavLink>
                  </li>
                  {loggedIn ? (
                    <li>
                      <button
                        type="button"
                        onClick={handleLoggedOut}
                        className={navbarStyles.mobileMenuItem}
                      >
                        <LogOut className={navbarStyles.mobileMenuIcon} />
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        to="/login"
                        className={navbarStyles.mobileMenuItem}
                        onClick={() => setMenuOpen(false)}
                      >
                        <LogIn className={navbarStyles.mobileMenuIcon} />
                        Login
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <style>
          {navbarStyles.animations}
        </style>
    </nav>
  );
}

export default Navbar;
