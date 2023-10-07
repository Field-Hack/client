import { Employee } from "./employees.types";

export interface Task {
  id: string;
  identifier: number,
  title: string,
  lat: number,
  service: number;
  long: number
  employee?: Employee;
}
