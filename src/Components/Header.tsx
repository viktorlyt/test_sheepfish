import classNames from "classnames";
import { NavLink, useLocation } from "react-router-dom";

type Status = { isActive: boolean };

const getActiveClass = (status: Status) =>
  classNames(
    { "has-white-color": status.isActive }
  );

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="header__pageName">
        <NavLink to="/" className={getActiveClass}>
          Home
        </NavLink>
      </nav>
      <nav className="header__pageName">
        <NavLink
          to={{
            pathname: "/products",
            search: location.search,
          }}
          className={getActiveClass}
        >
          Products
        </NavLink>
      </nav>
    </header>
  );
};
