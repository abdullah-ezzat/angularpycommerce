import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsSidebarComponent } from './bs-sidebar/bs-sidebar.component';
import { CategoryFormComponent } from './manage/add/category-form/category-form.component';

import { CategoryTableComponent } from './manage/view/category-table/category-table.component';
import { EditComponent } from './manage/edit/edit-category/edit-category.component';
import { ProductsComponent } from './manage/view/products/products.component';
import { ProductsFormComponent } from './manage/add/products-form/products-form.component';
import { EditProductComponent } from './manage/edit/edit-product/edit-product.component';
import { VendorsComponent } from './manage/view/vendors/vendors.component';
import { VendorsFormComponent } from './manage/add/vendors-form/vendors-form.component';
import { EditVendorComponent } from './manage/edit/edit-vendor/edit-vendor.component';
import { StoresComponent } from './manage/view/stores/stores.component';
import { StoresFormComponent } from './manage/add/stores-form/stores-form.component';
import { EditStoreComponent } from './manage/edit/edit-store/edit-store.component';
import { BrandsComponent } from './manage/view/brands/brands.component';
import { BrandsFormComponent } from './manage/add/brands-form/brands-form.component';
import { EditBrandComponent } from './manage/edit/edit-brand/edit-brand.component';
import { InventoryDetailComponent } from './manage/view/inventory-detail/inventory-detail.component';
import { InventoryDetailFormComponent } from './manage/add/inventory-detail-form/inventory-detail-form.component';
import { EditInventoryDetailComponent } from './manage/edit/edit-inventory-detail/edit-inventory-detail.component';
import { HomeComponent } from './screens/home/home.component';
import { ManageStoreComponent } from './manage/manage-store/manage-store.component';
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { ShoppingCartComponent } from './screens/shopping-cart/shopping-cart.component';
import { PriceListComponent } from './manage/view/price-list/price-list.component';
import { PriceFormComponent } from './manage/add/price-form/price-form.component';
import { EditPriceComponent } from './manage/edit/edit-price/edit-price.component';
import { CheckoutComponent } from './screens/checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductSpecificationComponent } from './views/product-specification/product-specification.component';
import { SpecificationFormComponent } from './manage/add/specification-form/specification-form.component';
import { ShippingAgentComponent } from './manage/view/shipping-agent/shipping-agent.component';
import { ShippingAgentFormComponent } from './manage/add/shipping-agent-form/shipping-agent-form.component';
import { MyOrdersComponent } from './manage-user/my-orders/my-orders.component';
import { ShippingAgentUserComponent } from './manage/view/shipping-agent-user/shipping-agent-user.component';
import { ShippingUserFormComponent } from './manage/add/shipping-user-form/shipping-user-form.component';
import { ShippingUserEditComponent } from './manage/edit/shipping-user-edit/shipping-user-edit.component';
import { EditSpecificationComponent } from './manage/edit/edit-specification/edit-specification.component';
import { ShippingProcessComponent } from './manage/view/shipping-process/shipping-process.component';
import { WelcomeComponent } from './screens/welcome/welcome.component';
import { ShippingAgentsEditComponent } from './manage/edit/shipping-agents-edit/shipping-agents-edit.component';
import { MyAccountComponent } from './manage-user/my-account/my-account.component';
import { FooterComponent } from './views/footer/footer.component';
import { GetAllService } from './api/all/get-all.service';
import { ProductImageComponent } from './views/product-image/product-image.component';
import { MapDialogComponent } from './views/map-dialog/map-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BsSidebarComponent,
    CategoryFormComponent,
    CategoryTableComponent,
    EditComponent,
    ProductsComponent,
    ProductsFormComponent,
    EditProductComponent,
    VendorsComponent,
    VendorsFormComponent,
    EditVendorComponent,
    StoresComponent,
    StoresFormComponent,
    EditStoreComponent,
    BrandsComponent,
    BrandsFormComponent,
    EditBrandComponent,
    InventoryDetailComponent,
    InventoryDetailFormComponent,
    EditInventoryDetailComponent,
    HomeComponent,
    ManageStoreComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    PriceListComponent,
    PriceFormComponent,
    EditPriceComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProductSpecificationComponent,
    SpecificationFormComponent,
    ShippingAgentComponent,
    ShippingAgentFormComponent,
    MyOrdersComponent,
    ShippingAgentUserComponent,
    ShippingUserFormComponent,
    ShippingUserEditComponent,
    EditSpecificationComponent,
    ShippingProcessComponent,
    WelcomeComponent,
    ShippingAgentsEditComponent,
    MyAccountComponent,
    FooterComponent,
    ProductImageComponent,
    MapDialogComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 2000,
      progressBar: true,
    }),
    NgbModule,
    MaterialFileInputModule,
  ],
  providers: [
    GetAllService,
    HomeComponent,
    SpecificationFormComponent,
    ShoppingCartComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
