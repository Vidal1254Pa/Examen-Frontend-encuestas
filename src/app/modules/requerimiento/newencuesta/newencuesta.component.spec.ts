import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewencuestaComponent } from './newencuesta.component';

describe('NewencuestaComponent', () => {
  let component: NewencuestaComponent;
  let fixture: ComponentFixture<NewencuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewencuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewencuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
