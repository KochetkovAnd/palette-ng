import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWheelPalettePageComponent } from './generate-wheel-palette-page.component';

describe('GenerateWheelPalettePageComponent', () => {
  let component: GenerateWheelPalettePageComponent;
  let fixture: ComponentFixture<GenerateWheelPalettePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateWheelPalettePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateWheelPalettePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
