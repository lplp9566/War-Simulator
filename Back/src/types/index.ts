

export interface IResource{
    name : string,
    amount : number
}

export interface IUser {
    userName: string;
    password: string;
    organization: string;
    location: "North" | "South" | "Center" | "West Bank" | "null";
    resources : IResource[] | null;
    lounchedRockets?: null;

}