import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { jsPDF } from 'jspdf';


@Component({
  standalone: true,
  selector: 'app-ticket',
  imports: [CommonModule],
  templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {

  data: any;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private paiementService: PaiementService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.paiementService.getByReservation(this.id)
      .subscribe(res => this.data = res);
  }

  print() {
    const pdf = new jsPDF();
    pdf.text('TICKET DE TRANSPORT', 60, 20);
    pdf.text(`Nom : ${this.data.nom}`, 20, 40);
    pdf.text(`Trajet : ${this.data.trajet}`, 20, 50);
    pdf.text(`Place : ${this.data.numeroPlace}`, 20, 60);
    pdf.text(`Prix : ${this.data.montant} FCFA`, 20, 70);
    pdf.save('ticket.pdf');
  }
}
