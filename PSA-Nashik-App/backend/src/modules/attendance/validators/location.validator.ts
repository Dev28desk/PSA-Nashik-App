


import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationValidator {
  constructor(private configService: ConfigService) {}

  validateLocation(
    lat: number, 
    lng: number, 
    allowedRadiusMeters = 100
  ): boolean {
    const centerLat = this.configService.get('ATTENDANCE_CENTER_LAT');
    const centerLng = this.configService.get('ATTENDANCE_CENTER_LNG');
    
    if (!centerLat || !centerLng) {
      throw new Error('Attendance center coordinates not configured');
    }

    return this.calculateDistance(lat, lng, centerLat, centerLng) <= allowedRadiusMeters;
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    // Haversine formula implementation
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }
}


