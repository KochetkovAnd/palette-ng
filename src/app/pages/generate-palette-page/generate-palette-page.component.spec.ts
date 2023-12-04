import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePalettePageComponent } from './generate-palette-page.component';

describe('GeneratePalettePageComponent', () => {
  let component: GeneratePalettePageComponent;
  let fixture: ComponentFixture<GeneratePalettePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratePalettePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratePalettePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
