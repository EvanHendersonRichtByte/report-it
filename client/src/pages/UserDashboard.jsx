import { Navbar, NavbarList, NavbarItem } from "../components/Navbar";

export default function UserDashboard() {
  const navLink = (title, redirect, extClass) => {
    return { title, redirect, extClass };
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Navbar
          brand="Report it"
          expandBreakpoint="sm"
          extClass="border-bottom navbar-light p-2"
        >
          <NavbarList>
            <NavbarItem navLink={navLink("Home", "/", "active")} />
            <NavbarItem navLink={navLink("About", "about")} />
          </NavbarList>
          <NavbarList extClass="ms-auto">
            <NavbarItem navLink={navLink("Profile", "/", "profile")} />
            <NavbarItem navLink={navLink("Sign out", "sign out")} />
          </NavbarList>
        </Navbar>
      </div>
      <div className="row">
        <div className="col-md-2">
          <div className="row">
            <nav className="navbar navbar-light col-md-12 border-end pt-3">
              <div className="container-fluid border-bottom ">
                <h6 className="text-center mx-auto">Main Desk</h6>
              </div>
              <ul className="navbar-nav ps-3 w-100">
                <li className="nav-item">
                  <a
                    className="nav-link active d-flex justify-content-between"
                    aria-current="page"
                    href="/"
                  >
                    <p>Reports</p>
                    <span>{">"}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link d-flex justify-content-between"
                    href="/"
                  >
                    <p>Settings</p>
                    <span>{">"}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="container d-flex p-3">
              <div className="card col-md-3 m-2">
                <div className="card-body text-center">
                  <div className="card-title">Report Total</div>
                  <div className="card-content">
                    <h1>4</h1>
                  </div>
                </div>
              </div>
              <div className="card col-md-3 m-2">
                <div className="card-body text-center">
                  <div className="card-title">Report Total</div>
                  <div className="card-content">
                    <h1>4</h1>
                  </div>
                </div>
              </div>
              <div className="card col-md-3 m-2">
                <div className="card-body text-center">
                  <div className="card-title">Report Total</div>
                  <div className="card-content">
                    <h1>4</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
