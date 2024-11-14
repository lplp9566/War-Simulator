import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IAttack } from '../types';
const SERVER_URL = 'http://localhost:3000';
export function useSocket() {
const [socket, setSocket] = useState<Socket | null>(null);
const [connected, setConnected] = useState<boolean>(false);
// const [messages, setMessages] = useState<Message[]>([]);
const [attack,setattack] =useState<IAttack |null>(null) // current attack 
const [allAttacks,setallAttacks]= useState <IAttack[] |[]>([]) //allattack from the room 
const [room, setRoom] = useState<string>(''); // Keep track of the current room

useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Connected:', socketInstance.id);
      setConnected(true);
    });

    socketInstance.on('disconnect', (reason: string) => {
      console.log('Disconnected:', reason);
      setConnected(false);
    });
    socketInstance.on('room-attacks', (attacks: IAttack[]) => {
        console.log('Attacks received from room:', attacks);
        setallAttacks(attacks);
      });

      socketInstance.on('current-attack', (Attack: IAttack) => {
        console.log('Current attack received:', Attack);
        setattack(Attack);
      });
  

    socketInstance.on('heartbeat', (data: { time: string }) => {
      console.log('Heartbeat received:', data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [])

  function joinRoom(room: string) {
    if (socket) {
      socket.emit('join', room);
      setRoom(room);  // Update the current room state
      console.log(`Joining room: ${room}`);
    }
  }
  function leaveRoom(room: string) {
    if (socket) {
      socket.emit('leave', room);
      setRoom('');  // Reset room state when leaving
      console.log(`Leaving room: ${room}`);
    }
  }
  return {
    connected,
    room,
    attack,
    allAttacks,
    joinRoom,
    leaveRoom

  };


};