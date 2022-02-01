import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { debounceTime, switchMap } from "rxjs";

import { RepositoriesService } from "./repositories.service";
import { Repositories } from "./repositories.types";

@Component({
  selector: "app-repositories",
  templateUrl: "./repositories.component.html",
  styleUrls: ["./repositories.component.css"]
})
export class RepositoriesComponent implements OnInit {
  repositoryName = new FormControl("", {
    validators: [
      Validators.required,
      Validators.maxLength(100)
    ]
  });
  itemsLimit = 10;
  repositories: Repositories = [];
  requestState = {
    send: false,
    success: false,
    error: false
  };

  constructor(private repositoriesService: RepositoriesService) {
  }

  getMoreRepositories() {
    this.requestState.send = true;
    this.itemsLimit += 10;
    this.repositoriesService.getRepositoriesByName(this.repositoryName.value, this.itemsLimit).subscribe(repositories => {
      this.repositories = repositories;
      this.requestState = { send: false, success: true, error: false };
    });
  }

  ngOnInit() {
    this.subscribeToChangeRepositoryName();
  }

  private subscribeToChangeRepositoryName() {
    this.repositoryName.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(repositoryName => {
          this.itemsLimit = 10;
          this.requestState.send = true;
          return this.repositoriesService.getRepositoriesByName(repositoryName, this.itemsLimit);
        })
      )
      .subscribe(repositories => {
        this.repositories = repositories;
        this.requestState = { send: false, success: true, error: false };
      });
  }
}
