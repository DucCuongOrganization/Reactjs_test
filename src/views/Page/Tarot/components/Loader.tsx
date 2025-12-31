import React from "react";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div id="loading">
      <div className="loader-content">
        <div className="loader-icon">✦</div>
        <div className="loader-text">READING THE STARS...</div>
      </div>
    </div>
  );
};
