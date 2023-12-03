import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalettePageComponent } from './palette-page.component';

describe('PalettePageComponent', () => {
  let component: PalettePageComponent;
  let fixture: ComponentFixture<PalettePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PalettePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PalettePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
