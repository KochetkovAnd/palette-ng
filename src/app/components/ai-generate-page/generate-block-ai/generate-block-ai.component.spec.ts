import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBlockAiComponent } from './generate-block-ai.component';

describe('GenerateBlockAiComponent', () => {
  let component: GenerateBlockAiComponent;
  let fixture: ComponentFixture<GenerateBlockAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateBlockAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateBlockAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
