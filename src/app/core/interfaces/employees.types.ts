export interface Employee {
  id: number;
  name: string;
  start: [number, number];
  end: [number, number];
  profile: string;
  time_window?: [number, number];
  max_tasks?: number;
  cost?: {
    fixed: number;
    per_hour: number;
  };
  avatar_url?: string;
}
