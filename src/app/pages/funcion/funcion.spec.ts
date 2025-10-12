import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionComponent } from './funcion';

describe('FuncionComponent', () => {
  let component: FuncionComponent;
  let fixture: ComponentFixture<FuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
