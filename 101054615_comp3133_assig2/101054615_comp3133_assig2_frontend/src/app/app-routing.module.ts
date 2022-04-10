import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewListingComponent } from './addnew-listing/addnew-listing.component';
import { BookedListingComponent } from './booked-listing/booked-listing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchListingComponent } from './search-listing/search-listing.component';
import { ViewAddedListingComponent } from './view-added-listing/view-added-listing.component';


const routes: Routes = [
 // {path:'',component:HomeComponent},  // Home
  {path:'register',component:RegisterComponent}, //login
  {path:'login',component:LoginComponent}, //register
  {path:'',component:SearchListingComponent} , // search_listing
  {path:'addnew_listing',component:AddnewListingComponent},  // addnew_listing
  {path:'viewAdded_listing',component:ViewAddedListingComponent}, //viewAdded_listing
  {path:'booked_listing',component:BookedListingComponent} // booked_listing
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
