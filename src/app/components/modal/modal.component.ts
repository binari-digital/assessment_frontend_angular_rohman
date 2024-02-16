import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() image: string;
  @Input() name: string;

  showFallback = false;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  
  fallbackImage() {
    this.showFallback = true;
  }
}
