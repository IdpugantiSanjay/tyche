import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDeleteConfirmationComponent } from './record-delete-confirmation.component';

describe('RecordDeleteConfirmationComponent', () => {
  let component: RecordDeleteConfirmationComponent;
  let fixture: ComponentFixture<RecordDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
