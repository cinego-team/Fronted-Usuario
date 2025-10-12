import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaListaComponent } from './lista-pelicula';

describe('PeliculaListaComponent', () => {
  let component: PeliculaListaComponent;
  let fixture: ComponentFixture<PeliculaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
