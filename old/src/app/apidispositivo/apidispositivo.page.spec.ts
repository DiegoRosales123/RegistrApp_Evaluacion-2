import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApidispositivoPage } from './apidispositivo.page';

describe('ApidispositivoPage', () => {
  let component: ApidispositivoPage;
  let fixture: ComponentFixture<ApidispositivoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApidispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
