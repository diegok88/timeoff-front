import Solicitacao from "./solicitacao";

export type RootStackParamList = {
  index: undefined;
  principal: undefined;
  cadsol: undefined;
  listsol: undefined;
  detsol: { solicitacao: Solicitacao }; // Tipo definido corretamente
};