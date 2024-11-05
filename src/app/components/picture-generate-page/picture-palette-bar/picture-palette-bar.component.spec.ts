import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePaletteBarComponent } from './picture-palette-bar.component';

describe('PicturePaletteBarComponent', () => {
  let component: PicturePaletteBarComponent;
  let fixture: ComponentFixture<PicturePaletteBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicturePaletteBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicturePaletteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
