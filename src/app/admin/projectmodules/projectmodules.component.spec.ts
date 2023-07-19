import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectmodulesComponent } from './projectmodules.component';

describe('ProjectmodulesComponent', () => {
  let component: ProjectmodulesComponent;
  let fixture: ComponentFixture<ProjectmodulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectmodulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
