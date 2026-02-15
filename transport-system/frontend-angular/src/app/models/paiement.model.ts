export interface Paiement {
  id?: number;
  reservation: number;
  montant: number;
  date_paiement?: string;
  statut: string;
}
