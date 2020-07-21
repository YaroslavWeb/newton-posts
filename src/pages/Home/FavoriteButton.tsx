import React from "react";

interface FavoriteButtonProps {
  toggleFavorite: () => void;
  isFavorite: boolean
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({toggleFavorite, isFavorite}) => {

  return (
    <button
      className={`btn waves-effect waves-light ${isFavorite ? ('teal lighten-1') : ('pulse blue lighten-1')}`}
      type="submit"
      name="action"
      onClick={toggleFavorite}
    >
      <i className="material-icons">{isFavorite ? "star" : "star_border"}</i>
    </button>
  );
};
