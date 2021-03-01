import React, { useRef, useState } from "react";
import { Link } from "gatsby";
import SiteMetaData from "./SiteMetadata.js";
import ArrowDown from "../svg-icons/arrow-down.js";

const Navbar = () => {
  const [navBarActiveClass, setNavBarActiveClass] = useState("");
  const [navBarChildActiveClass, setNavBarChildActiveClass] = useState("");
  const { title: siteName, logoSmall, topNav } = SiteMetaData();
  const img = logoSmall?.base;
  const imgWidth = logoSmall.childImageSharp?.original?.width;
  const imgHeight = logoSmall.childImageSharp?.original?.height;
  const menu = useRef();

  const toggleHamburger = () => {
    navBarActiveClass ? setNavBarActiveClass("") : setNavBarActiveClass("is-active");
  };

  const toggleChild = (e) => {
    e.target.classList.toggle("open");
    window.innerWidth < 1024 && (navBarChildActiveClass ? setNavBarChildActiveClass("") : setNavBarChildActiveClass("active"));
  };

  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="logo-container" title={siteName}>
            <img src={`/img/${img}`} alt={siteName} loading="lazy" width={imgWidth} height={imgHeight} />
          </Link>
          {/* Hamburger menu */}
          <div className={`navbar-burger burger ${navBarActiveClass}`} data-target="navMenu" onClick={() => toggleHamburger()}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`} style={{ height: navBarActiveClass ? menu.current.clientHeight + 10 : 0 }}>
          <div className="navbar-end has-text-centered" ref={menu}>
            {topNav?.map((item, index) => (
              <div key={index} className={`navbar-item ${item.child?.length ? (item.child?.find((_item) => _item.child?.length)?.child?.length ? "navbar-parent-two" : "navbar-parent-one") : ""}`}>
                <Link className="navbar-item-link" to={item.link}>
                  {item.title}
                </Link>
                {!!item.child?.length && (
                  <>
                    <div className="open-parent" onClick={(e) => toggleChild(e)}>
                      <ArrowDown />
                    </div>
                    <nav className="nav-child-first">
                      {item.child.map((item, index) => (
                        <div key={index} className="navbar-item">
                          <Link className="navbar-item-link" to={item.link}>
                            {item.title}
                          </Link>
                          {!!item.child?.length && (
                            <nav className="nav-child-second">
                              {item.child.map((item, index) => (
                                <div key={index} className="navbar-item">
                                  <Link className="navbar-item-link" to={item.link}>
                                    {item.title}
                                  </Link>
                                </div>
                              ))}
                            </nav>
                          )}
                        </div>
                      ))}
                    </nav>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
