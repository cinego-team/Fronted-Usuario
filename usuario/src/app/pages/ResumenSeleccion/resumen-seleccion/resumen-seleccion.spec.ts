import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSeleccion } from './resumen-seleccion';

describe('ResumenSeleccion', () => {
  let component: ResumenSeleccion;
  let fixture: ComponentFixture<ResumenSeleccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenSeleccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenSeleccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
