import React from "react";
import { useLocation } from "react-router-dom";

import Api from "../../utills/Api";
import { IPost, IHome } from "../../interfaces";
import { homeReducer, initialState, ACTIONS } from "./reducer";
import { Post } from "./Post";
import { Pagination } from "../../components/Pagination";
import { Spiner } from "../../components/Spiner";
import { SelectLimitPage } from "./SelectLimitPage";

export const Home: React.FC = () => {
  const location = useLocation();
  const [state, dispatch] = React.useReducer<React.Reducer<IHome, any>>(homeReducer, initialState);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [curPage, setCurPage] = React.useState<number>(1);

  // Инициализация постов
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const initialPosts = await Api.posts();
      dispatch({ type: ACTIONS.INITIAL, value: initialPosts });
      setIsLoading(false);
    })();
  }, []);

  // Определение старницы
  React.useEffect(() => {
    if (state.isLoaded) {
      setCurPage(Number(new URLSearchParams(location.search).get("page") || 1));
    }
  }, [location.search, state.isLoaded]);

  // Установка лимита постов на странице
  const selectLimit = (value: string) => {
    dispatch({ type: ACTIONS.LIMIT, value: +value });
  };

  if (isLoading) {
    return <Spiner />;
  }

  // Количество страниц
  const countPages = Math.ceil(state.posts.length / state.postsPerPage);

  // Посты для показа на странице
  const curPosts = state.posts.slice(
    (curPage - 1) * state.postsPerPage,
    state.postsPerPage + (curPage - 1) * state.postsPerPage
  );

  return (
    <div className="container">
      <SelectLimitPage selectLimit={selectLimit} limit={state.postsPerPage} />
      <Pagination curPage={curPage} countPages={countPages} />
      <div className="row">
        {curPosts.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Pagination curPage={curPage} countPages={countPages} />
    </div>
  );
};
