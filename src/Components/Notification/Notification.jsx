import React from "react";
import "../Notification/Notification.scss";

export default function Notification({alertText, styling}) {
  return (
    <div className={`alert alert-${styling}`} role="alert">
        {alertText}
    </div>
  );
}
