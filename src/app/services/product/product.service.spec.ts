import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ApiService } from '../api.service';
import { StorageService } from '../storage/storage.service';
import { Product } from './product.model';

describe('ProductService', () => {
  let productService: ProductService;
  let httpMock: HttpTestingController;
  let apiUrlStub: Partial<ApiService>;
  let storageServiceStub: Partial<StorageService>;

  beforeEach(() => {
    apiUrlStub = {
      getProductApiUrl: () => 'mockProductUrl'
    };
    
    storageServiceStub = {
      getToken: () => 'mockToken'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: ApiService, useValue: apiUrlStub },
        { provide: StorageService, useValue: storageServiceStub }
      ]
    });

    productService = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('should fetch products when user is logged in', () => {
    const mockProducts: Product[] = [
      {
        createdAt: '2024-02-15',
        name: 'Product 1',
        image: 'image-url-1.jpg',
        color: 'red',
        product: 'product-type',
        description: 'Product 1 description',
        material: 'material-type',
        adjective: 'adjective-type',
        price: '100',
        slug: 'product-1',
        id: '1'
      },
      {
        createdAt: '2024-02-16',
        name: 'Product 2',
        image: 'image-url-2.jpg',
        color: 'blue',
        product: 'product-type',
        description: 'Product 2 description',
        material: 'material-type',
        adjective: 'adjective-type',
        price: '120',
        slug: 'product-2',
        id: '2'
      }
    ];

    productService.fetchProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('mockProductUrl');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle error when fetching products', () => {
    productService.fetchProducts().subscribe(
      () => fail('should have failed with an error'),
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('mockProductUrl');
    req.error(new ErrorEvent('Network error'));
  });
});
