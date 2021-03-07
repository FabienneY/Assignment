import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis: Assignment;
  checked: boolean;
  
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssignment();
    this.checked = false;
    
  }

  getAssignment() {
    // 1 récupérer l'id de l'assignment dans l'URL
    let id: number = +this.route.snapshot.params.id;
    console.log('COMPOSANT DETAIL ID = ' + id);

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      //console.log(assignment);
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {

    this.checked=true;
    this.assignmentTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);

        // on retourne à la page d'accueil
        this.router.navigate(['/assignment', this.assignmentTransmis.id, 'editnote']);
      });
  }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.assignmentTransmis = null;

        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: { nom: 'toto', age: '30' },
      fragment: 'edition',
    });
  }

  NonAssignmentRendu() {

    this.checked=false;
    this.assignmentTransmis.rendu = false;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((message) => {
        console.log(message);

        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }

}