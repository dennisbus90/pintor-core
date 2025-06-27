import React, { useEffect, useState } from "react";

interface TagProps {
  value: string;
}
const Tag = ({ value }: TagProps) => {
  const [color, setColor] = useState("#d9ffdf");
  const [text, setText] = useState("");

  useEffect(() => {
    if (value) {
      value === "IN_PROGRESS" ? setColor("#dbecff") : setColor("#e2ffe6");
      value === "IN_PROGRESS" ? setText("In Progress") : setText("Completed");
    }
  }, [value]);

  return (
    <div
      style={{
        backgroundColor: color,
        padding: ".25rem .75rem .25rem .25rem",
        borderRadius: 12,
        fontSize: 12,
        display: "inline-block",
        height: 18,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: 18,
          height: 18,
          marginRight: 4,
        }}
      >
        {value === "IN_PROGRESS" ? (
          <svg viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="#437cd6" stroke-width="0" />
            <polygon
              points="14.62 11 9 11 9 3.27 11 3.27 11 9 14.62 9 14.62 11"
              fill="#fff"
              stroke-width="0"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="10" fill="#06c659" stroke-width="0" />
            <polygon
              points="9 14.66 5.05 10.71 6.47 9.29 9 11.83 14.39 6.44 15.81 7.86 9 14.66"
              fill="#fff"
              stroke-width="0"
            />
          </svg>
        )}
      </div>
      <div style={{ display: "inline-block", position: "relative", bottom: 5 }}>
        {text}
      </div>
    </div>
  );
};
export default Tag;
