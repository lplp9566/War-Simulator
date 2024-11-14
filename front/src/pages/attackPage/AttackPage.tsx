import React, { FC, useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useSocket } from "../../services/useSockit";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
const AttackPage: FC = () => {
    const [direction,setdirection] = useState("");
    const [nameOfMissile ]

  const user = useSelector((state: RootState) => state.user.user);
  const { joinRoom, connected} = useSocket();

  const foundResources = user?.resources?.map((resource) => (
    <NavBar key={resource.id} user={resource} />
  ));

  const handleSubmit = async (e:React.FormEvent) => {
     e.preventDefault();
     socket.emit("createAttack", user?.userName, localStorage.getItem("token"), nameOfMissile, direction);
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
        <select name="location" id="location" onChange={(e)=>setdirection(e.target.value)}> 
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
