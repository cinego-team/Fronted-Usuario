import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionButaca } from './seleccion-butaca';

describe('SeleccionButaca', () => {
  let component: SeleccionButaca;
  let fixture: ComponentFixture<SeleccionButaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionButaca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionButaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
