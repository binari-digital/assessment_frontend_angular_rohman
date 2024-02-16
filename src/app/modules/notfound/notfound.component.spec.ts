import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotfoundComponent } from './notfound.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotfoundComponent;
  let fixture: ComponentFixture<NotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct header and description', () => {
    const header = fixture.nativeElement.querySelector('h1');
    const description = fixture.nativeElement.querySelectorAll('.desc div');

    expect(header.textContent).toContain('Not Found');
    expect(description[0].textContent).toContain("Hmm, You're Lost!");
    expect(description[1].textContent).toContain('Need to login?');
  });

  it('should have a button to go back to login page', () => {
    const button = fixture.nativeElement.querySelector('button');

    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toContain('Back to Login page');
  });

  it('should have a router link to login page', () => {
    const routerLink = fixture.nativeElement.querySelector('a');

    expect(routerLink.getAttribute('routerLink')).toEqual('/login');
  });
});
