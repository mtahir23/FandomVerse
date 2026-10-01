import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comics } from './comics';

describe('Comics', () => {
  let component: Comics;
  let fixture: ComponentFixture<Comics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comics],
    }).compileComponents();

    fixture = TestBed.createComponent(Comics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
