import autoresToName from "./autor-to-name.json"

export interface Autor {
  nombre: string
  handle: string
  avatar: string
  instagramUrl: string
}

export const getAutor = (handle: string): Autor => {
  if (handle in autoresToName) {
    return {
      nombre: autoresToName[handle],
      handle,
      avatar: `/autores/${handle}.jpg`,
      instagramUrl: `https://www.instagram.com/${handle}`,
    }
  } else {
    throw new Error(`Autor "${handle}" no encontrado`)
  }
}
