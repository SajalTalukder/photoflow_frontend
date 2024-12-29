// components/ui/LoadingButton.tsx
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button"; // Import the Shadcn Button
import { Loader } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Loader className="animate-spin mr-2" /> : null}
      {children}
    </Button>
  );
};

export default LoadingButton;
