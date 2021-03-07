import { Component, OnInit} from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { Matiere } from './matiere.model'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit{
  assignmentSelectionne: Assignment;
  assignments: Assignment[] ;
  matieres:Matiere[];
  
  
  constructor(private assignmentService: AssignmentsService, private router: Router, private route: ActivatedRoute, private authService:AuthService) {}
  

  ngOnInit(): void {
    console.log('Demande des assignments via le service...');
    this.assignmentService.getAssignments().subscribe((assignements) => {
      this.assignments = assignements;
      console.log('Données reçues...');
    });
    console.log('getAssignments appelé....');
  }

  afficherendu(): void {
    console.log('Demande des assignments via le service...');
    this.assignmentService.getAssignments().subscribe((assignements) => {
      this.assignments = assignements;
      console.log('Données reçues...');
    });
    console.log('getAssignments appelé....');
  }

  assignmentClique(a: Assignment) {
    console.log('Assignment cliqué : ' + a.nom);
    this.assignmentSelectionne = a;
  }

  onNouvelAssignment(newAssignment: Assignment) {
    this.assignmentService.addAssignment(newAssignment).subscribe((message) => {
      console.log(message);
    });
    // et on cache le formulaire et on réaffiche la liste à jour
    //this.formVisible = false
  }

  onDelete() {
    this.assignmentService
      .deleteAssignment(this.assignmentSelectionne)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.assignmentSelectionne = null;

        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }

  sedeconnecter(){
    this.authService.deconnecte().subscribe(result=>{
        if(result.auth==false){
          this.router.navigate(['/home']);
          console.log('Vous êtes deconnecté');
        }
    });
    
  }

  isConnect():boolean {
    return this.authService.estconnecte;
  }

}
