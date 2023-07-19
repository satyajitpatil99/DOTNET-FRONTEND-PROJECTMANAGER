import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjecttaskComponent } from './projecttask.component';

describe('ProjecttaskComponent', () => {
  let component: ProjecttaskComponent;
  let fixture: ComponentFixture<ProjecttaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjecttaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjecttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
