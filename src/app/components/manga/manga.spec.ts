import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Manga } from './manga';

describe('Manga', () => {
  let component: Manga;
  let fixture: ComponentFixture<Manga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manga],
    }).compileComponents();

    fixture = TestBed.createComponent(Manga);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
