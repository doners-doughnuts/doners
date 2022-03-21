import React from "react";

type ButtonType = 'primary' | 'secondary' | 'default';

interface ButtonProps {
  type: ButtonType;
  // theme: Theme;
  onClick: (...args: any[]) => void;
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, children }) => (
  <button
    className={`button button--${type}`}
    onClick={onClick}>
    {/* style={{...theme as React.CSSProperties}}> */}

    {children}
  </button>
)