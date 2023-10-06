import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted: boolean = false;
  titleError: boolean = false;
  descriptionError: boolean = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void { }

  saveTutorial(): void
  {
    if (!this.validate()) {
      return;
    }
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: false
    };

    this.tutorialService.create(data)
      .subscribe({
        next: (res) => {
          console.log('AddTutorialComponent.saveTutorial res', res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  private validate(): boolean
  {
    this.titleError = (!this.tutorial.title);
    this.descriptionError = (!this.tutorial.description);

    return !this.titleError && !this.descriptionError;
  }

  newTutorial(): void
  {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
