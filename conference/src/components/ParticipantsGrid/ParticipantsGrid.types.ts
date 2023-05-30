import { User } from "../../types/User";

export type GetParticipantsResponse = {
  data: {
    items: User[];
  };
  isLoading: boolean;
  isError: boolean;
};

export type DeleteParticipantResponse = {
  data: { userId: number | null };
  isLoading: boolean;
  isError: boolean;
};
