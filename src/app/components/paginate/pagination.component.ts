import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number;
  @Input() maxPage: number;
  @Input() perPage: number;
  @Input() step: number;
  @Output() pageChange = new EventEmitter<number>();
  @Output() perPageChange = new EventEmitter<Event>();

  next() {
    this.pageChange.emit(this.currentPage + 1);
  }

  previous() {
    this.pageChange.emit(this.currentPage - 1);
  }

  setPage(page: number) {
    this.pageChange.emit(page);
  }

  get pageIndices(): number[] {
    const indices = [];
    for (let idx = 0; idx < this.maxPage; idx++) {
      if (idx > this.currentPage - this.step && idx < this.currentPage + this.step) {
        indices.push(idx);
      }
    }
    return indices;
  }
}
