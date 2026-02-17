import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionComponent } from './recognition.component';

describe('RecognitionComponent', () => {
  let component: RecognitionComponent;
  let fixture: ComponentFixture<RecognitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecognitionComponent]
    });
    fixture = TestBed.createComponent(RecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
