import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPaletteBarComponent } from './horizontal-palette-bar.component';

describe('HorizontalPaletteBarComponent', () => {
  let component: HorizontalPaletteBarComponent;
  let fixture: ComponentFixture<HorizontalPaletteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalPaletteBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorizontalPaletteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
