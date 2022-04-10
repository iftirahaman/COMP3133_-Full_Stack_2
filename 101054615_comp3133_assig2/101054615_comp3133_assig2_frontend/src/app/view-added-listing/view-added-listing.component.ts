import { Component, Injectable, OnInit } from '@angular/core';
import { Apollo, APOLLO_OPTIONS, gql } from 'apollo-angular';
import { map, Observable,Subscription } from 'rxjs';
import { AuthService } from '../auth.service';


const GET_ADDED_LISTINGS = gql`
query($username: String!){
  getListingAsAdmin(username: $username) {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    username
  }
}

`;


@Injectable({
  providedIn: 'root'
})
class ViewBookedListingService {
  constructor(private apollo: Apollo){}

  getBooking(username: String) {
    return this.apollo.watchQuery({
      query: GET_ADDED_LISTINGS,
      variables: {
        username,
      },
    });
  }
}


@Component({
  selector: 'app-view-added-listing',
  templateUrl: './view-added-listing.component.html',
  styleUrls: ['./view-added-listing.component.css'],
})
export class ViewAddedListingComponent implements OnInit {

  loading = true;
  listings: any;

  private querySubscription!: Subscription;
  constructor(private apollo: Apollo,private viewBookedListingService: ViewBookedListingService) { }

  ngOnInit(): void {
    // this.listings = this.apollo
    // .watchQuery({
    //   query: GET_LISTINGS,
    // })
    // .valueChanges.pipe(
    //   map((result: any) => {
    //     console.log(result.data.listings);
    //     return result.data.listings;
    //   })
    // );
    let token = localStorage.getItem("token");
    let username = token? JSON.parse(atob(token.split('.')[1])).username : ""
    if (username != ""){
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_ADDED_LISTINGS,
        variables: {
          username,
        },
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.loading = loading;
          this.listings = data.getListingAsAdmin;
          console.log(this.listings);
        });

    }



      // this.viewBookedListingService.getBooking(user)
      // .valueChanges
      // .subscribe(({ data }) => {
      //   console.log('got data', data);
        
      // }, (error) => {
      //   console.log('there was an error sending the query', error);
      // });
  }

}
