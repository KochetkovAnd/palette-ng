import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorCircleComponent } from './color-circle.component';

describe('ColorCircleComponent', () => {
  let component: ColorCircleComponent;
  let fixture: ComponentFixture<ColorCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
