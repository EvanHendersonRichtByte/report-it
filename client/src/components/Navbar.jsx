const Navbar = ({ children, brand, expandBreakpoint, extClass }) => (
  <nav className={`navbar navbar-expand-${expandBreakpoint} ${extClass}`}>
    <div className="container-fluid">
      {brand && (
        <a className="navbar-brand" href="/">
          {brand}
        </a>
      )}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        {children}
      </div>
    </div>
  </nav>
);

const NavbarList = ({ children, extClass = "" }) => (
  <ul className={`navbar-nav ${extClass}`}>{children}</ul>
);

const NavbarItem = ({ children, extClass = "", navLink }) => {
  /**
   * NavLink Params
   * Title
   * Redirect
   * ExtClass
   */
  if (navLink) {
    return <li className={`nav-item ${extClass}`}>{NavbarLink(navLink)}</li>;
  } else {
    return <li className={`nav-item ${extClass}`}>{children}</li>;
  }
};

const NavbarLink = ({ title, redirect, extClass = "" }) => (
  <a className={`nav-link ${extClass}`} href={redirect}>
    {title}
  </a>
);

export { Navbar, NavbarList, NavbarItem, NavbarLink };
