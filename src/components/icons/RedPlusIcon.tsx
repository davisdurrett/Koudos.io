import React from "react";

interface RedPlusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const RedPlusIcon = ({ className, ...props }: RedPlusIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ef4444"
      {...props}
      className={className}
    >
      <path
        d="M12 4v16m-8-8h16"
        stroke="#ef4444"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default RedPlusIcon;
