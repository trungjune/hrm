import React from "react";
import { Link } from "react-router-dom";
import "./quick-links.css";

export default function QuickLinks({ sideNavOpenKeysHandler }) {
  const QuickLinksContainer = ({ link, icon, bg, linkName }) => {
    return (
      <Link to={link}>
        <div className="quick-links-inner-container">
          <div style={{ backgroundColor: bg }} className="quick-link">
            {icon}
          </div>
          <span className="quick-link-title">{linkName}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="quick-links-wrapper">
      <p className="quick-links-title">Quick Links</p>

      <div className="quick-links-container">
        <QuickLinksContainer
          link="/admin/product"
          bg="#009EFF40"
          linkName="PRODUCT"
          icon={
            <i
              style={{ color: "#009EFF" }}
              className="bi bi-box-fill quick-links-icon"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/supplier"
          bg="#25316D40"
          linkName="PURCHASE"
          icon={
            <i
              style={{ color: "#25316D" }}
              className="bi bi-bag-fill quick-links-icon"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/customer"
          bg="#FD841F40"
          linkName="SALE"
          icon={
            <i
              style={{ color: "#FD841F" }}
              className="bi bi-receipt quick-links-icon"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/account"
          bg="#3E6D9C40"
          linkName="ACCOUNTS"
          icon={
            <i
              style={{ color: "#3E6D9C" }}
              className="bi bi-wallet-fill quick-links-icon"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/account/trial-balance"
          bg="#8CB8ED40"
          linkName="REPORT"
          icon={
            <i
              style={{ color: "#8CB8ED" }}
              className="bi bi-flag-fill quick-links-icon"
            ></i>
          }
        />
        <QuickLinksContainer
          link="/admin/hr/staffs"
          bg="#E14D2A40"
          linkName="HR"
          icon={
            <i
              style={{ color: "#E14D2A" }}
              className="bi bi-person-circle quick-links-icon"
            ></i>
          }
        />

        <QuickLinksContainer
          link="/admin/invoice-setting"
          bg="#3F3B6C40"
          linkName="SETTINGS"
          icon={
            <i
              style={{ color: "#3F3B6C" }}
              className="bi bi-gear-fill quick-links-icon"
            ></i>
          }
        />
      </div>
    </div>
  );
}
