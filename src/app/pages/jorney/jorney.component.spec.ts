import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JorneyComponent } from './jorney.component';

describe('JorneyComponent', () => {
  let component: JorneyComponent;
  let fixture: ComponentFixture<JorneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JorneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JorneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
