import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../../interfaces/tasks.types';
import { Employee } from '../../interfaces/employees.types';
import { HttpClient } from '@angular/common/http';
import { GeoJSONData, ORSResponse, Route } from './routins.type';

export interface ChatCompletionChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role: string;
      content: string;
    };
    finish_reason: string | null;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class RoutingServiceApi {
  public constructor(private readonly http: HttpClient) {}

  public async route({
    tasks,
    employees,
  }: {
    tasks: Task[];
    employees: Employee[];
  }): Promise<ORSResponse> {
    return firstValueFrom(
      this.http.post<ORSResponse>('http://150.136.218.106:2053/optimization', {
        jobs: tasks,
        vehicles: employees,
      })
    );
  }

  public async geoJson(route: Route): Promise<GeoJSONData> {
    return firstValueFrom(
      this.http.post<GeoJSONData>('http://150.136.218.106:2053/directions', {
        id: route.vehicle,
        coordinates: route.steps.map((step) => step.location),
        radiuses: route.steps.map((step) => 5000),
        language: 'pt',
        extra_info: [
          'steepness',
          'suitability',
          'surface',
          'waytype',
          'tollways',
          'waycategory',
          'shadow',
          'noise',
          'green',
          'countryinfo',
          'roadaccessrestrictions',
          'traildifficulty',
        ],
        attributes: ['avgspeed', 'detourfactor', 'percentage'],
      })
    );
  }

  public async fetchResumeCompletion(
    data: unknown
  ): Promise<Subject<ChatCompletionChunk>> {
    const eventSource = await fetch('http://150.136.218.106:2053/resume', {
      body: JSON.stringify(data),
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const stream = eventSource.body;
    const reader = stream!.getReader();

    const subject = new Subject<ChatCompletionChunk>();

    const readChunk = () => {
      reader
        .read()
        .then(({ value, done }) => {
          if (done) {
            console.log('Stream finished');
            return;
          }
          const chunkString = new TextDecoder().decode(value);

          for (const chunk of chunkString.split('\n')) {
            if (!chunk || chunk.includes('data: [DONE]')) {
              continue;
            }

            const parsedChunk = JSON.parse(chunk.split('data: ')[1]);

            subject.next(parsedChunk);
          }

          readChunk();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    readChunk();

    return subject;
  }
}
