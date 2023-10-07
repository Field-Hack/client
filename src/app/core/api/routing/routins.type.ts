export interface Route {
  vehicle: number;
  cost: number;
  delivery: number[];
  amount: number[];
  pickup: number[];
  setup: number;
  service: number;
  duration: number;
  waiting_time: number;
  priority: number;
  steps: Step[];
  violations: any[];
}

export interface Step {
  type: string;
  location: number[];
  setup: number;
  service: number;
  waiting_time: number;
  load: number[];
  arrival: number;
  duration: number;
  violations: any[];
  id?: number;
  job?: number;
}

export interface Summary {
  cost: number;
  routes: number;
  unassigned: number;
  delivery: number[];
  amount: number[];
  pickup: number[];
  setup: number;
  service: number;
  duration: number;
  waiting_time: number;
  priority: number;
  violations: any[];
  computing_times: {
    loading: number;
    solving: number;
  };
}

export interface ORSResponse {
  code: number;
  summary: Summary;
  unassigned: any[];
  routes: Route[];
}

export interface GeoJSONFeature {
  bbox: [number, number, number, number];
  type: "Feature";
  properties: {
    ascent: number;
    descent: number;
    transfers: number;
    fare: number;
    segments: {
      distance: number;
      duration: number;
      steps: {
        distance: number;
        duration: number;
        type: number;
        instruction: string;
        name: string;
        way_points: [number, number];
      }[];
      detourfactor: number;
      percentage: number;
      avgspeed: number;
      ascent: number;
      descent: number;
    }[];
    extras: {
      waycategory: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      surface: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      waytypes: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      steepness: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      suitability: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      roadaccessrestrictions: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
      traildifficulty: {
        values: [number, number, number][];
        summary: {
          value: number;
          distance: number;
          amount: number;
        }[];
      };
    };
    warnings: {
      code: number;
      message: string;
    }[];
    summary: {
      distance: number;
      duration: number;
    };
    way_points: [number, number, number];
  };
  geometry: {
    coordinates: [number, number, number][];
    type: "LineString";
  };
}

export interface GeoJSONData {
  type: "FeatureCollection";
  metadata: {
    attribution: string;
    service: string;
    timestamp: number;
    query: {
      coordinates: [number, number][];
      profile: string;
      format: string;
      language: string;
      attributes: string[];
      radiuses: number[];
      elevation: boolean;
      extra_info: string[];
    };
    engine: {
      version: string;
      build_date: string;
      graph_date: string;
    };
  };
  bbox: [number, number, number, number, number, number];
  features: GeoJSONFeature[];
}
