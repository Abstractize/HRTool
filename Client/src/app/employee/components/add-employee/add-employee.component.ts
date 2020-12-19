import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee';
import { Image } from '../../models/image';
import { EmployeeService } from '../../services/employee/employee.service';
import { ImageService } from '../../services/image/image.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {
  imageValue: Image = new Image('assets/profile.png');
  formValues = new FormGroup({
    employeeId: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
    email: new FormControl('',[Validators.required,Validators.email]),
    hire: new FormControl(new Date(),[Validators.required]),
    managerId: new FormControl('')
  });


  constructor(
    private readonly imageService: ImageService,
    private readonly employeeService: EmployeeService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {

  }

  async onFileSelected(event){
    const file: File = <File> event.target.files[0];
    const fd: FormData = new FormData();

    fd.append('image',file,file.name);

    this.imageService.post(fd).subscribe(response =>
      this.imageValue = response
    )
  }

  onSubmit(){
    if(this.formValues.valid && this.imageValue.id){
      const values = this.formValues.value;
      let value = new Employee(
        values.employeeId,
        values.name,
        this.imageValue,
        values.phone,
        values.email,
        values.hire
      );
      if(values.managerId !== '')
        value.managerId = values.managerId;
      this.employeeService.post(value).subscribe(() =>
        this.router.navigateByUrl('/')
      );
    }
  }
}
