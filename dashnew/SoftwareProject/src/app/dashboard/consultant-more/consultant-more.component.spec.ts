import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantMoreComponent } from './consultant-more.component';

describe('ConsultantMoreComponent', () => {
  let component: ConsultantMoreComponent;
  let fixture: ComponentFixture<ConsultantMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
