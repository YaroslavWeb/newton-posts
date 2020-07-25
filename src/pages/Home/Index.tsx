import React from "react";
import { useLocation } from "react-router-dom";

import Api from "../../utills/Api";
import { IPost, IHome } from "../../interfaces";
import { homeReducer, initialState, ACTIONS } from "./reducer";
import { Post } from "./Post";
import { Pagination } from "../../components/Pagination";
import { Spiner } from "../../components/Spiner";

export const Home: React.FC = () => {
  const location = useLocation();
  const [state, dispatch] = React.useReducer<React.Reducer<IHome, any>>(homeReducer, initialState);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Инициалиация постов и старницы
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      let curPage = Number(new URLSearchParams(location.search).get("page") || 1);
      const data = await Api.posts(curPage, 12);
      dispatch({ type: ACTIONS.INITIAL, value: { posts: await data.posts, totalCount: data.totalCount, curPage } });
      setIsLoading(false);
    })();
  }, [location.search]);


  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div className="container">
      <Pagination curPage={state.curPage} countPages={state.countPage} />
      <div className="row">
        {state.posts.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Pagination curPage={state.curPage} countPages={state.countPage} />
    </div>
  );
};
