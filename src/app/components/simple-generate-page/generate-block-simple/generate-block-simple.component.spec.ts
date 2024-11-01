import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBlockSimpleComponent } from './generate-block-simple.component';

describe('GenerateBlockSimpleComponent', () => {
  let component: GenerateBlockSimpleComponent;
  let fixture: ComponentFixture<GenerateBlockSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateBlockSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateBlockSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
