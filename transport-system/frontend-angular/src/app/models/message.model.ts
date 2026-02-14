export interface Message {
  id?: number;
  expediteurId?: number;
  destinataireId?: number;
  contenu: string;
  date?: string;
}
