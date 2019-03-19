import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsiteMainComponent } from './startsite-main.component';

describe('StartsiteMainComponent', () => {
  let component: StartsiteMainComponent;
  let fixture: ComponentFixture<StartsiteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartsiteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartsiteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
