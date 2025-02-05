import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPlanPage } from './new-plan.page';

describe('NewPlanPage', () => {
  let component: NewPlanPage;
  let fixture: ComponentFixture<NewPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
