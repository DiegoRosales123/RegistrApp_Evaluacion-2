import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiDispositivoPage } from './api-dispositivo.page';

describe('ApiDispositivoPage', () => {
  let component: ApiDispositivoPage;
  let fixture: ComponentFixture<ApiDispositivoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ApiDispositivoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
