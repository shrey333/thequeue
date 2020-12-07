import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchanteditComponent } from './merchantedit.component';

describe('MerchanteditComponent', () => {
  let component: MerchanteditComponent;
  let fixture: ComponentFixture<MerchanteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchanteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchanteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
