import { UUID } from "crypto";

export type Message = {
    id:UUID;
    idConversa: number;
    texto: string;
    idGrupo: number;
    isVendedor: boolean;
    timestampEnvio: Date;
    timestampFormatted: string;
}

export type MessagePayload = {
    id:UUID;
    idconversa: number;
    texto: string;
    idgrupo: number;
    isvendedor: boolean;
    timestampenvio: Date;
}


