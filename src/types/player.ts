export type UserType = {
    id: string;
    name: string;
};

export type PlayerType = UserType & {
    score: number;
};
