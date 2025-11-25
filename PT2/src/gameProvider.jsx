import React, { createContext, useReducer } from "react"

const estadoInicial = {
  danoRealizado: 0,
  objetivoDano: 100,
  caramelos: 10,
  danoPorDisparo: 2,
  disparosAutoPorSegundo: 1,
  mejorasDano: [],
  costoMultiplicador: 10,
  nivelesMejoraDano: [
    { id: "turron", etiqueta: "Cañón de Turrón Explosivo", dano: 2, costo: 15 },
    { id: "renos", etiqueta: "Renos-Lanzamisiles", dano: 5, costo: 30 },
    { id: "arbol", etiqueta: "Árbol de Navidad Láser", dano: 10, costo: 50 },
  ],
}

function reducerJuego(estado, accion) {
  switch (accion.tipo) {
    case "DISPARO_MANUAL":
      return {
        ...estado,
        danoRealizado: estado.danoRealizado + estado.danoPorDisparo,
      }
    case "DISPARO_AUTO":
      return {
        ...estado,
        danoRealizado: estado.danoRealizado + estado.danoPorDisparo * estado.disparosAutoPorSegundo,
      }
    case "COMPRAR_MULTIPLICADOR":
      if (estado.caramelos < estado.costoMultiplicador) return estado
      return {
        ...estado,
        caramelos: estado.caramelos - estado.costoMultiplicador,
        disparosAutoPorSegundo: estado.disparosAutoPorSegundo + 1,
        costoMultiplicador: Math.ceil(estado.costoMultiplicador * 1.2),
      }
    case "COMPRAR_MEJORA_DANO": {
      const siguienteMejora = estado.nivelesMejoraDano[estado.mejorasDano.length]
      if (!siguienteMejora || estado.caramelos < siguienteMejora.costo) return estado
      return {
        ...estado,
        caramelos: estado.caramelos - siguienteMejora.costo,
        danoPorDisparo: estado.danoPorDisparo + siguienteMejora.dano,
        mejorasDano: [...estado.mejorasDano, siguienteMejora.id],
      }
    }
    case "SIGUIENTE_OLEADA":
      return {
        ...estado,
        danoRealizado: 0,
        objetivoDano: Math.ceil(estado.objetivoDano * 1.1),
        caramelos: estado.caramelos + 10,
      }
    default:
      return estado
  }
}

export const ContextoJuego = createContext()

export function GameProvider({ children }) {
  const [estado, despachar] = useReducer(reducerJuego, estadoInicial)
  return (
    <ContextoJuego.Provider value={{ estado, despachar }}>
      {children}
    </ContextoJuego.Provider>
  )
}