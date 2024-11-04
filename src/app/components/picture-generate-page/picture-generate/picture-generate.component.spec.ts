import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureGenerateComponent } from './picture-generate.component';

describe('PictureGenerateComponent', () => {
  let component: PictureGenerateComponent;
  let fixture: ComponentFixture<PictureGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureGenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
