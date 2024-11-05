import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureColorBlockComponent } from './picture-color-block.component';

describe('PictureColorBlockComponent', () => {
  let component: PictureColorBlockComponent;
  let fixture: ComponentFixture<PictureColorBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PictureColorBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PictureColorBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
