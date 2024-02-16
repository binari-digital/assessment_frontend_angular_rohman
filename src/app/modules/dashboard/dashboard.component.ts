import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  originalProducts: Product[];
  products: Product[];
  productsPaginate: Product[];
  currentPage = 0;
  maxPage: number;
  step = 3;
  perPage = 10;
  colors: string[];
  selectedColorFilter = "";
  productNameFilter = "";
  sort = "asc";
  isLoading = false;

  constructor(private product: ProductService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.isLoading = true;
    this.product.fetchProducts().subscribe(
      (products: Product[]) => {
        const newProduct = [...products].sort((a, b) => a.name.localeCompare(b.name));
        this.originalProducts = newProduct;
        this.products = newProduct;
        this.productsPaginate = newProduct;
        this.getPaginatedItems();
        this.getPaginate();
        const colors = products.map(({ color }) => color);
        this.colors = [...new Set(colors)];
        this.isLoading = false;
      }
    )
  }

  getPaginatedItems() {
    const startIndex = (this.currentPage) * this.perPage;
    const endIndex = startIndex + this.perPage;
    const newProduct = this.productsPaginate.slice(startIndex, endIndex);
    this.products = newProduct;
  }

  pageChange(page: number) {
    this.currentPage = page;
    this.getPaginatedItems();
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.perPage = parseInt(target.value, 10);
    this.currentPage = 0;
    this.getPaginatedItems();
    this.getPaginate();
  }

  getPaginate() {
    const pageCount = Math.floor(this.productsPaginate.length / this.perPage);
    const remaining = this.productsPaginate.length % this.perPage ? 1 : 0;
    this.maxPage = pageCount + remaining;
  }

  filterColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedColorFilter  = target.value;
    this.currentPage = 0;
    this.productNameFilter  = "";
    if (this.selectedColorFilter ) {
      this.productsPaginate = this.originalProducts.filter(({ color }) => color === this.selectedColorFilter || !this.selectedColorFilter);
    } else {
      this.productsPaginate = this.originalProducts;
    }
    this.getPaginate();
    this.getPaginatedItems();
  }

  filterName(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.productNameFilter  = target.value.toLowerCase();
    this.currentPage = 0;
    this.selectedColorFilter  = "";
    if (this.productNameFilter ) {
      this.productsPaginate = this.originalProducts.filter(({ name }) => name.toLowerCase().includes(this.productNameFilter) || !this.productNameFilter);
    } else {
      this.productsPaginate = this.originalProducts;
    }
    this.getPaginate();
    this.getPaginatedItems();
  }

  sortAscending() {
    this.products = [...this.originalProducts].sort((a, b) => a.name.localeCompare(b.name));
    this.sort = "asc";
  }

  sortDescending() {
    this.products = [...this.originalProducts].sort((a, b) => b.name.localeCompare(a.name));
    this.sort = "desc";
  }

  openModal(productId: string) {
    const modalRef = this.modalService.open(ModalComponent);
    const product = this.originalProducts.find(({ id }) => id === productId);
    modalRef.componentInstance.image = product?.image;
    modalRef.componentInstance.name = product?.name;
  }
}
