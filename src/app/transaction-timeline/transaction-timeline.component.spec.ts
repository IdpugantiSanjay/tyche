import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTimelineComponent } from './transaction-timeline.component';

describe('TransactionTimelineComponent', () => {
  let component: TransactionTimelineComponent;
  let fixture: ComponentFixture<TransactionTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
