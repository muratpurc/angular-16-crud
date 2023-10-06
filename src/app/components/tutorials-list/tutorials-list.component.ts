import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Response } from 'src/app/classes/response';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials?: Array<Tutorial>;
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void
  {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void
  {
    this.tutorialService.getAll()
      .subscribe({
        next: (res) => {
          this.tutorials = new Response(res).toTutorial();
          console.log('TutorialsListComponent.retrieveTutorials res', res);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void
  {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void
  {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void
  {
    this.tutorialService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log('TutorialsListComponent.removeAllTutorials res', res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void
  {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title)
      .subscribe({
        next: (res) => {
          this.tutorials = new Response(res).toTutorial();
          console.log('TutorialsListComponent.searchTitle res', res);
        },
        error: (e) => console.error(e)
      });
  }

  resetSearch(): void
  {
    this.title = '';
    this.refreshList();
  }

  onKeydown(event: KeyboardEvent): void
  {
    console.log(event);
    if (event.key === 'Enter') {
      this.searchTitle();
    } else if (event.key === 'Escape') {
      this.resetSearch();
    }
  }

}
