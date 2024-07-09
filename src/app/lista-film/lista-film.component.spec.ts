import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFilmComponent } from './lista-film.component';

describe('ListaFilmComponent', () => {
  let component: ListaFilmComponent;
  let fixture: ComponentFixture<ListaFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFilmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
