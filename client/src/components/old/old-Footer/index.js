import React from "react";
import './index.css'

function Footer(props) {
  return (
    <footer>
      <hr />
      <p className="pull-right">
        <i className="fab fa-react" /><a id="copyright" href="https://github.com/danninemx/google-books-search">Copyright © 2019</a>
      </p>
    </footer>
  );
}

export default Footer;
