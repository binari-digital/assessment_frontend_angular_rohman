import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image if showFallback is false', () => {
    component.image = 'test-image-url';
    component.name = 'Test Image';
    component.showFallback = false;
    fixture.detectChanges();
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('.image');
    expect(imageElement).toBeTruthy();
    expect(imageElement.src).toContain('test-image-url');
    expect(imageElement.alt).toContain('Test Image');
  });

  it('should display fallback image if showFallback is true', () => {
    component.showFallback = true;
    fixture.detectChanges();
    const fallbackImageElement: HTMLImageElement = fixture.nativeElement.querySelector('.image');
    expect(fallbackImageElement).toBeTruthy();
    expect(fallbackImageElement.src).toContain('angular.png');
    expect(fallbackImageElement.alt).toContain('Fallback Image');
  });

  it('should call fallbackImage method on image load error', () => {
    spyOn(component, 'fallbackImage');
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('.image');
    const errorEvent = new Event('error');
    imageElement.dispatchEvent(errorEvent);
    fixture.detectChanges();
    expect(component.fallbackImage).toHaveBeenCalled();
  });

  it('should close modal when close button is clicked', () => {
    const modalService: NgbActiveModal = TestBed.inject(NgbActiveModal);
    spyOn(modalService, 'dismiss');
    const closeButton: HTMLButtonElement = fixture.nativeElement.querySelector('.close');
    closeButton.click();
    expect(modalService.dismiss).toHaveBeenCalled();
  });
});
