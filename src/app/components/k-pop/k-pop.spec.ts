import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KPop } from './k-pop';

describe('KPop', () => {
  let component: KPop;
  let fixture: ComponentFixture<KPop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KPop],
    }).compileComponents();

    fixture = TestBed.createComponent(KPop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
