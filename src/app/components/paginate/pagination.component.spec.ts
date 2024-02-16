import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit next page when next button is clicked', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 1;
    component.next();
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should emit previous page when previous button is clicked', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 2;
    component.previous();
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should emit page index when a page button is clicked', () => {
    spyOn(component.pageChange, 'emit');
    component.setPage(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should display correct page indices', () => {
    component.currentPage = 3;
    component.maxPage = 5;
    component.step = 3;
    component.perPage = 10;
    fixture.detectChanges();
    const pageIndices = component.pageIndices;
    expect(pageIndices).toEqual([1, 2, 3, 4]);
  });

  it('should emit perPageChange event when per page selection is changed', () => {
    spyOn(component.perPageChange, 'emit');
    const selectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = '20';
    selectElement.dispatchEvent(new Event('change'));
    expect(component.perPageChange.emit).toHaveBeenCalled();
  });
});
