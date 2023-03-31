import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <p className="footer__logo"> {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
