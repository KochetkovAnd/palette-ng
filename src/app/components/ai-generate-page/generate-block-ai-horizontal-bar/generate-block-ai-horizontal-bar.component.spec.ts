import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBlockAiHorizontalBarComponent } from './generate-block-ai-horizontal-bar.component';

describe('GenerateBlockAiHorizontalBarComponent', () => {
  let component: GenerateBlockAiHorizontalBarComponent;
  let fixture: ComponentFixture<GenerateBlockAiHorizontalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateBlockAiHorizontalBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateBlockAiHorizontalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
