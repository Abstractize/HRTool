import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInfoComponent } from '../employee-info/employee-info.component';
import { DialogInformationComponent } from 'src/app/core/components/dialog-information/dialog-information.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  public modal: NgbModalRef;
  public modalRefDialog: DialogInformationComponent;
  public allEmployees: Employee[];
  public employees: Employee[];
  public filter: string;
  public modalRef: EmployeeInfoComponent;

  constructor(
    service: EmployeeService,
    private readonly modalService: NgbModal
    ) {
    service.getAll().subscribe((result) => {
      this.allEmployees = result;
      this.search();
    });
  }

  ngOnInit(): void {

  }

  open(employee: Employee) {
    this.modalRef = this.modalService
      .open(EmployeeInfoComponent, { centered: true, size: 'lg', scrollable: true })
      .componentInstance;
    this.modalRef.employee = employee;
  }

  search(): void {
    this.employees = this.allEmployees
      .filter(
        (employee) =>
          employee.name.toLowerCase().includes(this.filter.toLowerCase()) ||
          employee.employeeId.toLowerCase().includes(this.filter.toLowerCase())
      )
      .sort((a, b) => (a.name < b.name ? -1 : 1));
    if(this.employees.length < 1){
      this.modal = this.modalService.open(DialogInformationComponent, {
        centered: true,
        size: 'sm',
      });
      this.modalRefDialog = this.modal.componentInstance;
      this.modalRefDialog.title = 'Error';
      this.modalRefDialog.body = `Employee with ${this.filter} was not found.`;
    }
  }
}
