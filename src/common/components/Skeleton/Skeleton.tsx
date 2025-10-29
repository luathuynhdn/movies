import React from "react";

interface SkeletonProps {
  loading: boolean;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  loading,
  children,
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  className = "",
}) => {
  if (loading) {
    return (
      <div
        className={`skeleton-wrapper ${className}`}
        style={{ width, height, borderRadius }}
      />
    );
  }
  return <>{children}</>;
};

export default Skeleton;
