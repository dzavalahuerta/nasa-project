import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSocialMediaComponent } from './link-social-media.component';

describe('LinkSocialMediaComponent', () => {
  let component: LinkSocialMediaComponent;
  let fixture: ComponentFixture<LinkSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
