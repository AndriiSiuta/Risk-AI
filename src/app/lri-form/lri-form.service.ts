import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Point {
  x: number;
  y: number;
}


export interface ILriForm {
  borderX: string;
  borderY: string;
  radiusX: string;
  radiusY: string;
}

@Injectable({
  providedIn: 'root'
})

export class LriFormService {
  private mockCoordinates: Array<Point> = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 10, y: 20 }, { x: 15, y: 10 }];
  private interSectionResult$ = new BehaviorSubject<Point[]>([]);

  public intersectionPoints = this.interSectionResult$.asObservable();

  private RADIUS_DISTANCE = 0;

  constructor() {
  }

  /**
   * Calculate D from point to center of Circle
   * @param pointFromFile
   * @param radius
   */
  calculateDistanceToCenter(pointFromFile: Point, radius: Point): number {
    return +Math.sqrt((pointFromFile.x - radius.x) ** 2 + (pointFromFile.y - radius.y) ** 2)
      .toPrecision(3);
  }

  /**
   * Calculate radius R
   * @param radius
   * @param border
   */
  calculateRadiusDistance(radius: Point, border: Point): void {
    this.RADIUS_DISTANCE = this.calculateDistanceToCenter(border, radius);
    console.log(this.RADIUS_DISTANCE);
  }

  /**
   * Search all intersections
   * @param formData
   */
  search(formData: ILriForm) {
    const radius: Point = {
      x: +formData.radiusX,
      y: +formData.radiusY
    };

    const border: Point = {
      x: +formData.borderX,
      y: +formData.borderY
    }

    this.calculateRadiusDistance(radius, border);
    this.interSectionResult$.next(this.mockCoordinates.filter((p: Point) => {
      const pointD = this.calculateDistanceToCenter(p, radius);
      if (pointD < this.RADIUS_DISTANCE) {
        return p;
      }

      return false;
    }));
  }
}
