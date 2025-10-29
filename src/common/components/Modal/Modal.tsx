import "./modal.scss";

import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  minWidth?: string | number;
  width?: string | number;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  minWidth = "60%",
  width = "60%",
  children,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // Open/close with animation
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 300); // allow reflow for transition
    } else if (isVisible) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`modal-overlay ${isAnimating ? "show" : "hide"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isAnimating ? "show" : "hide"}`}
        style={{ minWidth, width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
