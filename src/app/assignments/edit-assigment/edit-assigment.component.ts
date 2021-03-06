import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EditAssigmentComponent implements OnInit {
  assignment: Assignment;
  // formulaire
  nomassignment: string;
  nomEleve: string;
  dateDeRendu: Date;
  nomMatiere: string;
  note:number;
  remarque:string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ThirdFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private _formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.firstFormGroup = this._formBuilder.group({
      ctrlun: ['', Validators.required],  
      ctrldeux: ['', Validators.required],  
      ctrltrois: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      ctrlquatre: ['', Validators.required]
    });
    this.ThirdFormGroup = this._formBuilder.group({
      ctrlcinq: ['', Validators.required], 
      ctrlsix: ['', Validators.required]
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
        this.nomassignment = assignment.nom;
        this.nomEleve = assignment.auteur;
        this.dateDeRendu = assignment.dateDeRendu;
        this.nomMatiere = assignment.nomMatiere;
        this.note = assignment.note;
        this.remarque = assignment.remarque;
      }
    });
  }

  onSaveAssignment() {
    if (this.nomassignment) {
      this.assignment.nom = this.nomassignment;
    }

    if (this.nomEleve) {
      this.assignment.auteur = this.nomEleve;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if (this.nomMatiere) {
      this.assignment.nomMatiere = this.nomMatiere;
    }

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
        this.router.navigate(['/assignment', this.assignment.id]);
      });
      
  }
}