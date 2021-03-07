import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere }  from '../matiere.model';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // pour le formulaire
  
  nomDevoir = '';
  nomEleve = '';
  dateDeRendu: Date = null;
  nomMatiere = '';
  image ='' ;
  nomP='';
  photo = '';
  note: number = 0;
  remarque = '';

  
  
   matieres: Matiere[] = [
    {nomMatiere: 'oracle', imgMatiere: 'assets/images/oracle.png', nomProf: 'Gabriel Mopolo', photoProf: 'assets/images/Mopolo.png'},
    {nomMatiere: 'Angular', imgMatiere: 'assets/images/angular.png', nomProf: 'Michel Buffa', photoProf: 'assets/images/Buffa.png'},
    {nomMatiere: 'Grails', imgMatiere: 'assets/images/grails.png', nomProf: 'Gregory Galli', photoProf: 'assets/images/Galli.jpg'},
    {nomMatiere: 'java', imgMatiere: 'assets/images/java.png', nomProf: 'Amosse Edouard', photoProf: 'assets/images/Amosse.png'},
    {nomMatiere: 'Docker', imgMatiere: 'assets/images/docker.jpg', nomProf: 'Kamagate Beman', photoProf: 'assets/images/Beman.jpg'},
    {nomMatiere: 'Andoid', imgMatiere: 'assets/images/android.png', nomProf: 'Amosse Edouard', photoProf: 'assets/images/Amosse.png'},
    {nomMatiere: 'R', imgMatiere: 'assets/images/R.png', nomProf: 'Alison Temin', photoProf: 'assets/images/Alison.jpg'},
  ];

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(event) {
    // evite la soumission standard du formulaire, qui génère un warning
    // dans la console...
    event.preventDefault();
    
    console.log(
      'Dans submit nom = ' + this.nomDevoir + ' date = ' + this.dateDeRendu + ' eleve = ' + this.nomEleve
      + ' matiere = ' + this.nomMatiere
      + ' note = ' + this.note
    );

    
    let newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.nomEleve;
    this.matieres.forEach(a => {
      if(a.nomMatiere == this.nomMatiere)
      {
        newAssignment.nomMatiere=a.nomMatiere;
        newAssignment.imgMatiere= a.imgMatiere;
        newAssignment.nomProf=a.nomProf;
        newAssignment.photoProf=a.photoProf;

      }
    });
    newAssignment.note=this.note;
    newAssignment.remarque=this.remarque;

    // on va utiliser directement le service
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this._snackBar.open('Assignment enregistré enregistrée', '',{
          duration: 2000
        });

        // il va falloir naviguer de nouveau vers la page d'accueil
        // on va devoir faire l'équivalent du routerLink="/home" mais
        // par programme...
        // on retourne à la page d'accueil
        this.router.navigate(['/affiche']);
      });
  }
}