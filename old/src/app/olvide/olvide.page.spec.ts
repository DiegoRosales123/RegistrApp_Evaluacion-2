import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvidePage } from './olvide.page';

describe('OlvidePage', () => {
  let component: OlvidePage;
  let fixture: ComponentFixture<OlvidePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OlvidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
