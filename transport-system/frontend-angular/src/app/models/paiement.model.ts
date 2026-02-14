export interface Paiement {
  id?: number;
  reservation: number;       // identifiant de la réservation
  montant: number;           // montant payé
  statut?: 'PAYE' | 'EN_ATTENTE'; // statut du paiement
  date_paiement?: string;    // optionnel, si ton backend renvoie la date
}
