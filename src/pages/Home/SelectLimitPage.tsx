import React from "react";

interface SelectLimitPageProps{
  selectLimit: (value: string) => void
  limit: number
}

export const SelectLimitPage: React.FC<SelectLimitPageProps> = ({selectLimit, limit}) => {
  return (
    <div className="row">
    <div className="col s2 offset-s5">
      <label>Кол-во элементов на странице</label>
      <select value={limit} onChange={(e)=>{selectLimit(e.target.value)}} className="browser-default">
        <option defaultValue="12">12</option>
        <option defaultValue="24">24</option>
        <option defaultValue="36">36</option>
      </select>
    </div>
  </div>
  );
};
