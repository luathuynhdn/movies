import React from "react";

interface Props {
  view: "gridView" | "listView";
  onChange: (view: "gridView" | "listView") => void;
}

const ViewSwitch: React.FC<Props> = ({ view, onChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={view === "gridView" ? "active" : ""}
        onClick={() => onChange("gridView")}
      >
        🟦 Grid
      </button>
      <button
        className={view === "listView" ? "active" : ""}
        onClick={() => onChange("listView")}
      >
        📋 List
      </button>
    </div>
  );
};

export default ViewSwitch;
