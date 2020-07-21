import React from "react";

interface CommentsProps {
  isLoading: boolean;
  isFavorite: boolean;
  toggleComments: () => void;
}

export const CommentsButton: React.FC<CommentsProps> = ({
  isLoading,
  isFavorite,
  toggleComments,
}) => {
  return (
    <button
      className={`btn waves-effect waves-light ${
        isFavorite ? "teal lighten-1" : "blue lighten-1"
      }`}
      type="submit"
      name="action"
      disabled={isLoading}
      onClick={toggleComments}
    >
      <i className="material-icons left">comment</i>
      Комментарии
    </button>
  );
};
