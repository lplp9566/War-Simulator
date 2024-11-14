import React, { FC } from "react";
import NavBar from "../../components/navBar/navBar";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const AttackPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const foundResources = user?.resources?.map((resource) => (
    <NavBar key={resource.id} user={resource} />
  ));

  return (
    <div>
        {<h1>ATTACK PAGE</h1>}
      <form action="">
        <select name="" id="">
          <option value="north">north</option>
          <option value="center">center</option>
          <option value="south">south</option>
          <option value="westBank">westBank</option>
        </select>
        {user?.resources?.map((res) => (
          <button onClick={() => {}}>{`${res.name} ${res.amount}`}</button>
        ))}
      </form>
    </div>
  );
};

export default AttackPage;
