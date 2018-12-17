import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSettingsArmandaComponent } from './initial-settings-armanda.component';

describe('InitialSettingsArmandaComponent', () => {
  let component: InitialSettingsArmandaComponent;
  let fixture: ComponentFixture<InitialSettingsArmandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialSettingsArmandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSettingsArmandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
