import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalPaletteBarComponent } from './vertical-palette-bar.component';

describe('VerticalPaletteBarComponent', () => {
  let component: VerticalPaletteBarComponent;
  let fixture: ComponentFixture<VerticalPaletteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalPaletteBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalPaletteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
