export interface Trajet {
  id?: number;

  // champs utilisés par Django (POST / PUT)
  departure: string;
  destination: string;
  departure_time: string; // datetime-local / ISO
  price: number;

  car_id?: number; // ✅ DOIT ÊTRE OPTIONNEL

  // données en lecture seule (GET)
  car?: {
    id: number;
    number: string;
    seats: number;
  };
}
