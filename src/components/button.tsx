import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className="mt-3 py-4 text-lg font-medium text-white bg-emerald-500 hover:bg-emerald-700 transition-colors disabled:bg-gray-300"
    disabled={!canClick}
  >
    {loading ? 'Loading...' : actionText}
  </button>
);
