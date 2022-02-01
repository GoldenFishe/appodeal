export type Repository = {
  description: string;
  id: string;
  name: string;
  stargazerCount: number;
  url: `https://github.com/${string}/${string}`;
  latestRelease: LatestRelease;
  owner: Owner
}

type LatestRelease = { createdAt: string } | null;
type Owner = {
  name?: string;
  avatarUrl?: string;
}

export type RawRepositories = {
  data: {
    search: {
      edges: Array<{ node: Repository }>
    }
  }
}

export type Repositories = Repository[];
