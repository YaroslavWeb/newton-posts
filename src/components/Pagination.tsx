import React from "react";
import { Link } from "react-router-dom";

interface PaginationProps {
  curPage: number;
  countPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  curPage,
  countPages,
}) => {
  let paginationItems: any[] = [];
  for (let index = 1; index <= countPages; index++) {
    Number(curPage) === index
      ? paginationItems.push(
          <li key={index} className="active blue darken-1">
            <Link to={"?page=" + index}>{index}</Link>
          </li>
        )
      : paginationItems.push(
          <li key={index} className="waves-effect">
            <Link to={"?page=" + index}>{index}</Link>
          </li>
        );
  }
  return (
    <ul className="pagination center">
      <li className={+curPage === 1 ? "disabled" : "waves-effect"}>
        <Link to={+curPage === 1 ? `?page=${curPage}` : `?page=${curPage - 1}`}>
          <i className="material-icons">chevron_left</i>
        </Link>
      </li>
      {paginationItems}
      <li className={+curPage === countPages ? "disabled" : "waves-effect"}>
        <Link
          to={
            +curPage === countPages
              ? `?page=${curPage}`
              : `?page=${+curPage + 1}`
          }
        >
          <i className="material-icons">chevron_right</i>
        </Link>
      </li>
    </ul>
  );
};
