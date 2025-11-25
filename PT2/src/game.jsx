import React, { useContext, useEffect } from "react";
import { ContextoJuego } from "./gameProvider";

export default function Juego() {
  const { estado, despachar } = useContext(ContextoJuego);
  const {
    danoRealizado, objetivoDano, caramelos, danoPorDisparo, disparosAutoPorSegundo,
  } = estado;

  useEffect(() => {
    const intervalo = setInterval(() => {
      despachar({ tipo: "DISPARO_AUTO" });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [despachar, disparosAutoPorSegundo]);

  useEffect(() => {
    if (danoRealizado >= objetivoDano) {
      setTimeout(() => despachar({ tipo: "SIGUIENTE_OLEADA" }), 700);
    }
  }, [danoRealizado, objetivoDano, despachar]);

  return ( 
    <div className="juego">
      <h1>¡Defiende la aldea navideña!</h1>
      <div></div>

      </div>
      )
}