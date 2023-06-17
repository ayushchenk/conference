export type User = {
  id: number;
  email: string;
  fullName: string;
  country: string;
  affiliation: string;
  webpage: string;
  isAdmin: boolean;
  roles: {
    [id: number]: string[];
  };
};
