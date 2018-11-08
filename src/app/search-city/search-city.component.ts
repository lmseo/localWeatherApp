/// <reference types="@types/googlemaps" />
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoordinatesService } from '../shared/services/coordinates.service';
import { MapsAPILoader } from '@agm/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
  searchForm: FormGroup;
  searchInputData: string;

  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(
    private coordsService: CoordinatesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        this.mapService
          .getCurrentCityByLatLon(coords.latitude, coords.longitute)
          .subscribe(data => {
            this.searchInputData = data.city;
          });
      }
    });
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });

    this.mapsAPILoader.load().then(data => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', event => {
        this.ngZone.run(arg => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // checking for proper data returned
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.coordsService.setLonLat(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        });
      });
    });
  }

  get searchInput() {
    return this.searchForm.get('searchInput');
  }
  getNewCity(event) {
    console.log(event);
  }
}
