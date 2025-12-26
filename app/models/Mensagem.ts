export type Message = {
    idConversa: number;
    texto: string;
    idGrupo: number;
    isVendedor: boolean;
    timestampEnvio: Date;
    timestampFormatted: string;
}

export type MessagePayload = {
    idconversa: number;
    texto: string;
    idgrupo: number;
    isvendedor: boolean;
    timestampenvio: Date;
}


