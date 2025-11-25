import React, { useReducer } from "react";
import GameContext from "../context/GameContext";
import { gameReducer, initialState } from "../reducer/gameReducer";

export default function GameProvider({ ninios }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {nin}
    </GameContext.Provider>
  );
}