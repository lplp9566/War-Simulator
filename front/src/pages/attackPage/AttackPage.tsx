import React, { FC, useEffect } from "react";
import NavBar from "../../components/navBar/navBar";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useSocket } from "../../services/useSockit";

const AttackPage: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { joinRoom, connected } = useSocket();

  const foundResources = user?.resources?.map((resource) => (
    <NavBar key={resource.id} user={resource} />
  ));

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();

  
  };

  useEffect(() => {
    if (connected && user?.userName) {
      joinRoom(user?.userName!);
    }
  }, [connected, user?.userName]);

  return (
    <div>
      <h1>ATTACK PAGE</h1>
      <form onSubmit={handleSubmit}>
        <select name="location" id="location">
          <option value="north">north</option>
          <option value="center">center</option>
          <option value="south">south</option>
          <option value="westBank">westBank</option>
        </select>

        <select name="resources" id="resources">
          {user?.resources?.map((res) => (
            <option key={res.id} value={`${res.name} ${res.amount}`}>
              {`${res.name} ${res.amount}`}
            </option>
          ))}
        </select>
        
        <button type="submit">Attack</button>
      </form>
    </div>
  );
};

export default AttackPage;
