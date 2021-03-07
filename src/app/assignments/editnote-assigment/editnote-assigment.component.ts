import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-editnote-assigment',
  templateUrl: './editnote-assigment.component.html',
  styleUrls: ['./editnote-assigment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EditnoteAssigmentComponent implements OnInit {
  assignment: Assignment;
  // formulaire
  note:number;
  remarque:string;
  firstFormGroup: FormGroup;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.firstFormGroup = this._formBuilder.group({
      ctrlun: ['', Validators.required],  
      ctrldeux: ['', Validators.required]
    });

    this.getAssignment();
  }

  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT EDIT ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      //console.log(assignment);
      this.assignment = assignment;
      if (assignment) {
        this.note = assignment.note;
        this.remarque = assignment.remarque;
      }
    });
  }

  onSaveAssignment() {
    
    if (this.note) {
      this.assignment.note = this.note;
    }

    if (this.remarque) {
      this.assignment.remarque = this.remarque;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this._snackBar.open('Note enregistrée', '',{
          duration: 2000
        });
        this.router.navigate(['/assignment', this.assignment.id]);
      });
      
  }
}

