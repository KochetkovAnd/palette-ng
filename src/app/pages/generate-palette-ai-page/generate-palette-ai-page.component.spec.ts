import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePaletteAiPageComponent } from './generate-palette-ai-page.component';

describe('GeneratePaletteAiPageComponent', () => {
  let component: GeneratePaletteAiPageComponent;
  let fixture: ComponentFixture<GeneratePaletteAiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratePaletteAiPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratePaletteAiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
