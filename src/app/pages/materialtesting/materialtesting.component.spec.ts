import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialtestingComponent } from './materialtesting.component';

describe('MaterialtestingComponent', () => {
  let component: MaterialtestingComponent;
  let fixture: ComponentFixture<MaterialtestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialtestingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaterialtestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
