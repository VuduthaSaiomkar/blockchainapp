import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';


const appRoutes: Routes = [
 
    {path:'',redirectTo:'/login',pathMatch:'full'},
    { path: '',   redirectTo: '/auctiondetails', pathMatch: 'full' },
    { path: '', redirectTo:'/registry',pathMatch:'full' },
    {path:'',redirectTo:'/results',pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}