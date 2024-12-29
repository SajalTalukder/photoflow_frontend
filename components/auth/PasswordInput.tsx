"use client";
import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react"; // Shadcn uses Lucide for icons

interface PasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  placeholder = "Enter password",
  value,
  onChange,
  inputClassName = "",
  labelClassName = "",
  iconClassName = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {label && (
        <label className={`font-semibold mb-2 block ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange} // Pass the onChange handler
          className={`px-4 py-3 bg-gray-200 rounded-lg w-full block outline-none ${inputClassName}`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute outline-none right-3 top-3 p-0 ${iconClassName}`}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
};

export default PasswordInput;
