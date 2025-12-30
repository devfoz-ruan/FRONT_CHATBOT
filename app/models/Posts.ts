export type Posts = {
    id?: number,
    idVendedor: number,
    nome:string,
    cargo:string,
    texto: string,
    timestamp: Date,
    likes:number,
    iscomentario: boolean
    total_comentarios: number
}