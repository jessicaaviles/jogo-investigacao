import React from 'react';

interface LoadingProps {
  message?: string;
  fullPage?: boolean;
  small?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message, fullPage = true, small = false }) => {
  if (small) {
    return (
      <span className="loading-inline">
        <span className="loading-spinner loading-spinner--sm" />
        {message && <span className="loading-inline-text">{message}</span>}
      </span>
    );
  }

  if (!fullPage) {
    return (
      <div className="loading-block">
        <span className="loading-spinner loading-spinner--md" />
        {message && <p className="loading-block-text">{message}</p>}
      </div>
    );
  }

  return (
    <div className="loading-page">
      <span className="loading-spinner loading-spinner--lg" />
      {message && (
        <div className="loading-page-text">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
