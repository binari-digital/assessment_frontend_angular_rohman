import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Product } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  const mockProducts: Product[] = [
    {
      createdAt: '2024-02-15',
      name: 'A Product 1',
      image: 'image-url-1.jpg',
      color: 'red',
      product: 'product-type-1',
      description: 'Product 1 description',
      material: 'material-type',
      adjective: 'adjective-type',
      price: '100',
      slug: 'product-1',
      id: '1'
    },
    {
      createdAt: '2024-02-16',
      name: 'Some Product 2',
      image: 'image-url-2.jpg',
      color: 'blue',
      product: 'product-type-2',
      description: 'Product 2 description',
      material: 'material-type-2',
      adjective: 'adjective-type-2',
      price: '120',
      slug: 'product-2',
      id: '2'
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['fetchProducts']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [NgbModalModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    productService.fetchProducts.and.returnValue(of(mockProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    expect(productService.fetchProducts).toHaveBeenCalled();
    expect(component.originalProducts).toEqual(mockProducts);
    expect(component.products).toEqual(mockProducts);
    expect(component.productsPaginate).toEqual(mockProducts);
    expect(component.colors).toEqual(['red', 'blue']);
    expect(component.isLoading).toBeFalse();
  });

  it('should set pagination values correctly', () => {
    expect(component.currentPage).toBe(0);
    expect(component.perPage).toBe(10);
    expect(component.maxPage).toBe(1);
  });

  it('should emit page change event when page changes', () => {
    spyOn(component, 'getPaginatedItems');
    component.pageChange(2);
    expect(component.currentPage).toBe(2);
    expect(component.getPaginatedItems).toHaveBeenCalled();
  });

  it('should emit perPageChange event when per page selection changes', () => {
    spyOn(component, 'getPaginatedItems');
    spyOn(component, 'getPaginate');
    const event = { target: { value: '20' } } as unknown as Event;
    component.onItemsPerPageChange(event);
    expect(component.perPage).toBe(20);
    expect(component.currentPage).toBe(0);
    expect(component.getPaginatedItems).toHaveBeenCalled();
    expect(component.getPaginate).toHaveBeenCalled();
  });

  it('should filter products by color correctly', () => {
    component.selectedColorFilter = 'red';
    component.filterColor({ target: { value: 'red' } } as unknown as Event);
    expect(component.productsPaginate).toEqual([mockProducts[0]]);
    expect(component.currentPage).toBe(0);
  });

  it('should filter products by name correctly', () => {
    component.productNameFilter = 'product';
    component.filterName({ target: { value: 'product' } } as unknown as Event);
    expect(component.productsPaginate).toEqual(mockProducts);
    expect(component.currentPage).toBe(0);
  });

  it('should sort products ascending', () => {
    component.sort = 'desc';
    component.sortAscending();
    expect(component.products).toEqual(mockProducts);
    expect(component.sort).toBe('asc');
  });

  it('should sort products descending', () => {
    component.sort = 'asc';
    component.sortDescending();
    expect(component.products).toEqual([...mockProducts].reverse());
    expect(component.sort).toBe('desc');
  });
});
