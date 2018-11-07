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

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit {
  // googleData: google.maps.places.PlaceResult;
  // googleData = {
  //   address_components: [
  //     {
  //       long_name: 'San Gabriel',
  //       short_name: 'San Gabriel',
  //       types: ['locality', 'political']
  //     },
  //     {
  //       long_name: 'Los Angeles County',
  //       short_name: 'Los Angeles County',
  //       types: ['administrative_area_level_2', 'political']
  //     },
  //     {
  //       long_name: 'California',
  //       short_name: 'CA',
  //       types: ['administrative_area_level_1', 'political']
  //     },
  //     {
  //       long_name: 'United States',
  //       short_name: 'US',
  //       types: ['country', 'political']
  //     }
  //   ],
  //   adr_address:
  //     '&lt;span class="locality"&gt;San Gabriel&lt;/span&gt;, &lt;span class="region"&gt;CA&lt;/span&gt;, &lt;span class="country-name"&gt;USA&lt;/span&gt;',
  //   formatted_address: 'San Gabriel, CA, USA',
  //   geometry: {
  //     location: {
  //       lat: 34.09611110000001,
  //       lng: -118.10583329999997
  //     },
  //     viewport: {
  //       south: 34.07111390000001,
  //       west: -118.12080800000001,
  //       north: 34.1153179,
  //       east: -118.07720589999997
  //     }
  //   },
  //   icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
  //   id: '51383874cb3f70c1b9da455bc0d2bc330164f236',
  //   name: 'San Gabriel',
  //   photos: [
  //     {
  //       height: 3144,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 4192
  //     },
  //     {
  //       height: 3464,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 4618
  //     },
  //     {
  //       height: 2934,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 5216
  //     },
  //     {
  //       height: 2934,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 5216
  //     },
  //     {
  //       height: 2418,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 4299
  //     },
  //     {
  //       height: 2934,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 5216
  //     },
  //     {
  //       height: 2934,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 5216
  //     },
  //     {
  //       height: 359,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/118224076998381642455/photos"&gt;Melanie Barrientos&lt;/a&gt;'
  //       ],
  //       width: 675
  //     },
  //     {
  //       height: 3024,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/110042825442034594681/photos"&gt;Hoyin Wan&lt;/a&gt;'
  //       ],
  //       width: 4032
  //     },
  //     {
  //       height: 2934,
  //       html_attributions: [
  //         '&lt;a href="https://maps.google.com/maps/contrib/114714710500858281915/photos"&gt;Raymond Yu&lt;/a&gt;'
  //       ],
  //       width: 5216
  //     }
  //   ],
  //   place_id: 'ChIJK7PxJ9vawoAR7OFLP8rH-bE',
  //   reference: 'ChIJK7PxJ9vawoAR7OFLP8rH-bE',
  //   scope: 'GOOGLE',
  //   types: ['locality', 'political'],
  //   url:
  //     'https://maps.google.com/?q=San+Gabriel,+CA,+USA&amp;ftid=0x80c2dadb27f1b32b:0xb1f9c7ca3f4be1ec',
  //   utc_offset: -480,
  //   vicinity: 'San Gabriel',
  //   html_attributions: []
  // };
  searchForm: FormGroup;
  searchInputData: string;

  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(
    private coordsService: CoordinatesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.coordsService.coordInfo$.subscribe(coords => {
      this.searchInputData = coords.city;
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

          this.coordsService.setLatLonCity(
            place.geometry.location.lat(),
            place.geometry.location.lng(),
            place.formatted_address
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
