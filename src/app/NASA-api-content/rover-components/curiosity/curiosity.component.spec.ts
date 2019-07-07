import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuriosityComponent } from './curiosity.component';

describe('CuriosityComponent', () => {
  let component: CuriosityComponent;
  let fixture: ComponentFixture<CuriosityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuriosityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriosityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
