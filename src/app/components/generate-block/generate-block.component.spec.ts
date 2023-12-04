import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBlockComponent } from './generate-block.component';

describe('GenerateBlockComponent', () => {
  let component: GenerateBlockComponent;
  let fixture: ComponentFixture<GenerateBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
