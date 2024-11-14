  export interface User {
    userName: string;
    password: string;
    organization ?: string;
    location ?: "North" | "South" | "Center" | "West Bank" | null;
   
 }

export type Status = "idle" | "pending" | "fulfilled" | "rejected"