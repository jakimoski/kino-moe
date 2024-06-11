import React from "react";
import "./FooterComponent.scss";

export default function FooterComponent() {
  return (
    <footer className="main-footer">
      <div className="main-footer__wrapper">
        <span className="main-footer__name">
          Kinemoe.mk {`© ${new Date().getFullYear()}`} - All rights reserved.
        </span>
      </div>
    </footer>
  );
}
