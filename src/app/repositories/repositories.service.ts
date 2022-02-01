import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { GraphqlService } from "../services/graphql.service";
import { RawRepositories, Repositories } from "./repositories.types";

@Injectable({
  providedIn: "root"
})
export class RepositoriesService {

  constructor(private graphqlService: GraphqlService) {
  }

  getRepositoriesByName(name: string, itemsAmount: number) {
    const query = `{
      search(query: "${name}", type: REPOSITORY, first: ${itemsAmount}) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
            url
            owner {
              ... on User {
                name
                avatarUrl(size: 40)
              }
            }
            latestRelease {
              createdAt
            }
          }
         }
        }
      }
    }`;
    return this.graphqlService.get<RawRepositories>(query)
      .pipe<Repositories>(map((repositories) => {
        return repositories.data.search.edges.map(edge => ({ ...edge.node }));
      }));
  }
}
