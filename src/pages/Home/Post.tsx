import React from "react";

import Api from "../../utills/Api";
import { IPost, IComment } from "../../interfaces";
import { FavoritesContext } from "../../context/FavoritesContext";
import { FavoriteButton } from "./FavoriteButton";
import { Spiner } from "../../components/Spiner";
import { CommentsButton } from "./CommentsButton";
import { Comment } from "./Comment";


interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  // Получение айдишников избранных постов
  const {
    favoritesList,
    setFavoritesList,
  }: { favoritesList: number[]; setFavoritesList: any } = React.useContext(
    FavoritesContext
  );
  
  // Комментарии поста
  const [comments, setComments] = React.useState<IComment[]>([]);

  // Является ли пост избранным
  const [isFavorite, setIsFavorite] = React.useState<boolean>(favoritesList.includes(post.id));

  // Видимость комментариев
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  // Подгрузка комментариев
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Переключение комментариев и их подгрузка при появлении
  const toggleComments = async () => {
    if (isVisible) {
      setIsVisible(false);
      setComments([]);
    } else {
      setIsLoading(true);
      setIsVisible(true);
      setComments(await Api.comments(post.id));
      setIsLoading(false);
    }
  };

  // Переключение избранного элемента в глобальном и локальном состояние
  const toggleFavorite = () => {
    if (favoritesList.includes(post.id)) {
      setIsFavorite(false);
      setFavoritesList((prev: number[]) =>
        prev.filter((item) => item !== post.id)
      );
    } else {
      setIsFavorite(true);
      setFavoritesList((prev: number[]) => [...prev, post.id]);
    }
  };

  return (
    <div className="col s12 m6 xl4">
      <div
        className={`card z-depth-2 post-card ${isFavorite ? "card teal" : "card blue"}`}
      >
        {isVisible ? (
          <div className="card-content white-text">
            <div className="comments-section">
              {isLoading && <Spiner />}
              {comments.map((comment: IComment, index:number) => (
                <Comment comment={comment} index={index}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-content white-text">
            <span className="card-title">{post.title}</span>
            <p>{post.body}</p>
          </div>
        )}

        <div className="card-action white-text">
          <CommentsButton
            isFavorite={isFavorite}
            toggleComments={toggleComments}
            isLoading={isLoading}
          />
          <FavoriteButton
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </div>
  );
};
