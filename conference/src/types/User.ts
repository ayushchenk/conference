export type User = {
  id: number;
  email: string;
  fullName: string;
  country: string;
  affiliation: string;
  webpage: string;
  roles: {
    [id: number]: string[];
  };
};
