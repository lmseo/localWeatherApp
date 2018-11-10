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
import { SearchCityService } from './search-city.service';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
  searchForm: FormGroup;
  @ViewChild('search') public searchElementRef: ElementRef;
  options: AutocompletePrediction[];

  constructor(
    private coordsService: CoordinatesService,
    private searchCityService: SearchCityService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });
    this.coordsService.coordInfo$.subscribe(coords => {
      if (coords) {
        this.mapService
          .getCurrentCityByLatLon(coords.latitude, coords.longitute)
          .subscribe(data => {
            this.searchInput.patchValue(data.city);
            console.log(data.city);
          });
      }
    });
  }
  onCityInput(value: string) {
    if (String(value).length > 4) {
      const sessionToken = new google.maps.places.AutocompleteSessionToken();
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.AutocompleteService();

        autocomplete.getPlacePredictions(
          { input: value, sessionToken: sessionToken },
          res => {
            this.options = res.slice(0);
            console.log(this.options);
          }
        );
      });
    }
  }
  onBlurIbput() {
    this.options = null;
  }
  get searchInput() {
    return this.searchForm.get('searchInput');
  }
  getNewCity(event) {
    console.log(event);
  }
}
