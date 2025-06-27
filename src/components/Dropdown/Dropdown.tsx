import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./dropdown.scss";
import type { DeepReadonly } from "../../utils/helpers/typescript";

export interface DropdownItem {
  name: string;
  value: string;
}

interface DropdownProps {
  title: string;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}

export const Dropdown = ({
  title,
  items,
  onSelect,
}: DeepReadonly<DropdownProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const root = document.getElementById("root");
  if (!root) return null;

  return (
    <div className="dropdown">
      <button
        className={`button is-dark is-outlined ${isOpen ? "is-active" : ""}`}
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} <span className="dropdown-arrow" />
      </button>

      {isOpen &&
        createPortal(
          <div
            className="dropdown-content"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
            }}
          >
            <ul>
              {items.map((item) => (
                <li
                  key={item.name}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="overlay" onClick={() => setIsOpen(false)} />
          </div>,
          root
        )}
    </div>
  );
};
