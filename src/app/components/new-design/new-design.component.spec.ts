import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDesignComponent } from './new-design.component';

describe('OverviewComponent', () => {
  let component: NewDesignComponent;
  let fixture: ComponentFixture<NewDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDesignComponent]
    });
    fixture = TestBed.createComponent(NewDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
