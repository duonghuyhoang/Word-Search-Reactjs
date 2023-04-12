import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const location = useLocation();
  const navLinkClass = ({ isActive }) => {
    return isActive ? "nav-link activated" : "nav-link";
  };
  const locationPart = location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    if (locationPart === "/word-search-reactjs/") {
      navigate("/");
    }
  }, [location]);

  return (
    <div className='wrapper-header'>
      <img
        className='image-logo'
        src='https://lh3.googleusercontent.com/p78TDfwBnU9WWrYmRORrTZGYlu5SJ_L47tqe3VlSmuWS_KjifN_h2aJGoxNMQPjyGO8bSAmjlLz6bHNjtQHaV58PqQ=w128-h128-e365-rj-sc0x00ffffff'
        alt=''
      />
      <h1 className='header-title'>Word Search</h1>
      <div className='nav'>
        <NavLink className={navLinkClass} to={"/"}>
          <span>Đồng âm</span>
        </NavLink>
        <NavLink className={navLinkClass} to={"/synonymous"}>
          <span>Đồng nghĩa</span>
        </NavLink>
        <NavLink className={navLinkClass} to={"/opposite"}>
          <span>Trái nghĩa</span>
        </NavLink>
      </div>
      <div className='logo-clone'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          fill='currentColor'
          className='bi bi-search'
          viewBox='0 0 16 16'
        >
          <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
        </svg>
      </div>
    </div>
  );
}
export default Header;
