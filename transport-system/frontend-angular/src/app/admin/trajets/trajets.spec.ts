import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTrajetsComponent } from './trajets.component';

describe('AdminTrajetsComponent', () => {
  let component: AdminTrajetsComponent;
  let fixture: ComponentFixture<AdminTrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTrajetsComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
