export type User = {
  id: number;
  email: string;
  fullName: string;
  country: string;
  affiliation: string;
  webpage: string;
  isAdmin: boolean;
  hasPreference: boolean;
  roles: {
    [id: number]: string[];
  };
};
