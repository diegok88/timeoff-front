import TipoDispensa from "./tipoDispensa";

export default interface Solicitacao {
    sodide: number;
    sodusu: number;
    sodsup: number;
    soddat: Date;
    sodtip: number;
    sodqtd: number;
    soddti: Date;
    soddtt: Date
    sodsta: string;
    tipoDispensa?: TipoDispensa;
}