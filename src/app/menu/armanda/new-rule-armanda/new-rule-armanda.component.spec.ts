import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRuleArmandaComponent } from './new-rule-armanda.component';

describe('NewRuleArmandaComponent', () => {
  let component: NewRuleArmandaComponent;
  let fixture: ComponentFixture<NewRuleArmandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRuleArmandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRuleArmandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
