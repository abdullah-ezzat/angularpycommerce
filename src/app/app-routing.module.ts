import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './screens/welcome/welcome.component';
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
import { ShippingAgentsEditComponent } from './manage/edit/shipping-agents-edit/shipping-agents-edit.component';
import { MyAccountComponent } from './manage-user/my-account/my-account.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'manage', component: ManageStoreComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'account', component: MyAccountComponent },
  { path: 'product', component: ProductDetailsComponent },
  { path: 'product/:Id', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'manage/shipping/process',
    component: ShippingProcessComponent,
  },
  { path: 'manage/add/category', component: CategoryFormComponent },
  { path: 'manage/categories', component: CategoryTableComponent },
  { path: 'manage/add/products', component: ProductsFormComponent },
  { path: 'manage/products', component: ProductsComponent },
  {
    path: 'manage/add/specification',
    component: SpecificationFormComponent,
  },
  {
    path: 'manage/specifications',
    component: ProductSpecificationComponent,
  },
  { path: 'manage/add/vendor', component: VendorsFormComponent },
  { path: 'manage/vendors', component: VendorsComponent },
  { path: 'manage/add/store', component: StoresFormComponent },
  { path: 'manage/stores', component: StoresComponent },
  { path: 'manage/add/brand', component: BrandsFormComponent },
  { path: 'manage/brands', component: BrandsComponent },
  { path: 'manage/add/price', component: PriceFormComponent },
  { path: 'manage/prices', component: PriceListComponent },
  {
    path: 'manage/add/inventory',
    component: InventoryDetailFormComponent,
  },
  { path: 'manage/inventories', component: InventoryDetailComponent },
  {
    path: 'manage/add/shippingagent',
    component: ShippingAgentFormComponent,
  },
  { path: 'manage/shippingagents', component: ShippingAgentComponent },
  {
    path: 'manage/add/shippinguser',
    component: ShippingUserFormComponent,
  },
  { path: 'manage/shippingusers', component: ShippingAgentUserComponent },
  {
    path: 'manage/edit/shippinguser',
    component: ShippingUserEditComponent,
  },
  {
    path: 'manage/edit/shippinguser/:Id',
    component: ShippingUserEditComponent,
  },
  { path: 'mange/edit/category', component: EditComponent },
  { path: 'manage/edit/category/:Id', component: EditComponent },
  { path: 'manage/edit/product', component: EditProductComponent },
  { path: 'manage/edit/product/:Id', component: EditProductComponent },
  { path: 'manage/edit/vendor', component: EditVendorComponent },
  { path: 'manage/edit/vendor/:Id', component: EditVendorComponent },
  { path: 'manage/edit/store', component: EditStoreComponent },
  { path: 'manage/edit/store/:Id', component: EditStoreComponent },
  { path: 'manage/edit/brand', component: EditBrandComponent },
  { path: 'manage/edit/brand/:Id', component: EditBrandComponent },
  {
    path: 'manage/edit/inventory',
    component: EditInventoryDetailComponent,
  },
  {
    path: 'manage/edit/inventory/:Id',
    component: EditInventoryDetailComponent,
  },
  {
    path: 'manage/edit/specification',
    component: EditSpecificationComponent,
  },
  {
    path: 'manage/edit/specification/:Id',
    component: EditSpecificationComponent,
  },
  { path: 'manage/edit/price', component: EditPriceComponent },
  { path: 'manage/edit/price/:Id', component: EditPriceComponent },
  {
    path: 'manage/edit/shippingagent',
    component: ShippingAgentsEditComponent,
  },
  {
    path: 'manage/edit/shippingagent/:Id',
    component: ShippingAgentsEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
