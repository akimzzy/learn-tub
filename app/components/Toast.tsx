"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: Readonly<ToastProps>) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500/90 text-white border border-green-400/30";
      case "error":
        return "bg-red-500/90 text-white border border-red-400/30";
      case "info":
        return "bg-blue-500/90 text-white border border-blue-400/30";
      default:
        return "bg-gray-500/90 text-white border border-gray-400/30";
    }
  };

  const getIcon = () => {
    return <Icon type={type} size="md" />;
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`
          flex items-center space-x-3 px-5 py-4 shadow-2xl backdrop-blur-xl rounded-xl
          transform transition-medium
          ${
            isAnimating
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-full opacity-0 scale-95"
          }
          ${getToastStyles()}
        `}
        role="alert"
        aria-live="polite"
      >
        {getIcon()}
        <span className="font-medium">{message}</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="ml-2 hover:opacity-75 p-1 hover:bg-white/20"
          aria-label="Close notification"
          icon={<Icon type="close" size="sm" />}
        >
          {""}
        </Button>
      </div>
    </div>
  );
}
