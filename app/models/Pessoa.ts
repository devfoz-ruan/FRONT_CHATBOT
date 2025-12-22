export type Pessoa = {
    id?: number;
    name: string;
    tel: string;
    email: string | null;
    password: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
    status: boolean;
    funcao: string;
};
