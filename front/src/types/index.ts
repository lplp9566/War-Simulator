  export interface User {
    userName: string;
    password: string;
    organization ?: string;
    location ?: "North" | "South" | "Center" | "West Bank" | null;
    resources?:resources[]
   
 }
export interface resources{
  id?:string
  name:string,
  amount:number
}
export type Status = "idle" | "pending" | "fulfilled" | "rejected"