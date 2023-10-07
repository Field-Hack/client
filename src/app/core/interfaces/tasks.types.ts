import { Employee } from "./employees.types";

export interface Task {
  id: number;
  description?: string;
  service: number;
  employee?: Employee;
  time_windows: [number, number][];
  setup: number;
  priority: number;
  location: [number, number];
}
