import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBlockComponent } from './save-block.component';

describe('SaveBlockComponent', () => {
  let component: SaveBlockComponent;
  let fixture: ComponentFixture<SaveBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
