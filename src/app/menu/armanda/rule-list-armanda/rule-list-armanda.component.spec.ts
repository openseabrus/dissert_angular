import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleListArmandaComponent } from './rule-list-armanda.component';

describe('RuleListArmandaComponent', () => {
  let component: RuleListArmandaComponent;
  let fixture: ComponentFixture<RuleListArmandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleListArmandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleListArmandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
