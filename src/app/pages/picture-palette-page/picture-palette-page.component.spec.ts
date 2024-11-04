import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturePalettePageComponent } from './picture-palette-page.component';

describe('PicturePalettePageComponent', () => {
  let component: PicturePalettePageComponent;
  let fixture: ComponentFixture<PicturePalettePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicturePalettePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicturePalettePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
