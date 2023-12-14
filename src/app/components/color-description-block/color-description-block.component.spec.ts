import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorDescriptionBlockComponent } from './color-description-block.component';

describe('ColorDescriptionBlockComponent', () => {
  let component: ColorDescriptionBlockComponent;
  let fixture: ComponentFixture<ColorDescriptionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorDescriptionBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorDescriptionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
