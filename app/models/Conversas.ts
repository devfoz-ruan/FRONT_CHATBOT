export type conversas = {
    grupoId: number;
    chatId: string;
    etapa: "humano" | "bot" | "off";
    status: boolean;
}