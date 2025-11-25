import React from "react";
import { GameProvider } from "./gameProvider";
import Game from "./game";

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}