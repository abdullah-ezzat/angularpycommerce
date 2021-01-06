import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProductsDetail } from './products/Products.model';
import { VendorDetails } from './vendors/vendors.model';
import { CategoryDetail } from './category-form/category.model';
import { StoresDetail } from './stores/Stores.model';
import { BrandsDetail } from './brands/brands.model';
import { InventoryDetails } from './inventory-detail/inventory-detail.model';
import { CartDetails } from './shopping-cart/cart.model';
import { PriceListDetails } from './price-list/price-list.model';
import { LoginDetails } from './login/login.model';
import { UserData } from './login/userData.Model';
import { ProductSpecificationDetails } from './product-specification/product-specification.model';
import { ShippingAgentDetails } from './shipping-agent/shipping-agent.model';
import { ShippingUserModel } from './shipping-agent-user/shipping-agent-user.model';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Injectable({
  providedIn: 'root',
})
export class GetDataApiService {
  private url = 'http://www.angulardemo.somee.com/Products';
  // url for production //
  // private url = 'http://localhost:50393/Products'--

  constructor(private http: HttpClient) {}

  getAllCategory() {
    return this.http.get(this.url + '/GetAllCategory');
  }

  GetAllCategoryForTable() {
    return this.http.get(this.url + '/GetAllCategoryForTable');
  }

  updateCategory(post: CategoryDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updateCategory', fromData.toString(), {
      headers,
    });
  }

  getSubCategory() {
    return this.http.get(this.url + '/GetSubCategory');
  }

  addNewCategory(post: CategoryDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewCategory', fromData.toString(), {
      headers,
    });
  }

  getCategory(Id) {
    return this.http.get(this.url + '/getCategory?id=' + Id);
  }

  getProduct(Id) {
    return this.http.get(this.url + '/getProduct?id=' + Id);
  }

  getCartItemDetail(Id) {
    return this.http.get(this.url + '/getCartItemDetail?id=' + Id);
  }

  GetAllProducts() {
    return this.http.get(this.url + '/GetAllProducts');
  }

  GetAllProductsForTable() {
    return this.http.get(this.url + '/GetAllProductsForTable');
  }

  addNewProduct(post: ProductsDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewProduct', fromData.toString(), {
      headers,
    });
  }

  formDataEncoder(post) {
    let params = new URLSearchParams();
    for (let key in post) {
      params.set(key, post[key]);
    }
    return params;
  }

  updateProduct(post: ProductsDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/updateProduct', fromData.toString(), {
      headers,
    });
  }

  addProductSpecification(post: ProductSpecificationDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/addProductSpecification',
      fromData.toString(),
      { headers }
    );
  }

  getAllproductSpecifications(ProductId) {

    return this.http.get(
      this.url + '/getAllproductSpecifications?ProductId=' + ProductId
    );
  }

  getAllproductSpecificationsFromBalance(Id) {

    return this.http.get(
      this.url + '/getAllproductSpecificationsFromBalance?Id=' + Id
    );
  }

  getProductSpecification(Id) {
    return this.http.get(this.url + '/getProductSpecification?id=' + Id);
  }

  updateProductSpecification(post: ProductSpecificationDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/updateProductSpecification',
      fromData.toString(),
      { headers }
    );
  }

  addNewVendor(post: VendorDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewVendor', fromData.toString(), {
      headers,
    });
  }

  getAllVendors() {
    return this.http.get(this.url + '/getAllVendors');
  }

  getAllSpecifications(CategoryId) {
    return this.http.get(
      this.url + '/getAllSpecifications?CategoryId=' + CategoryId
    );
  }

  updateVendor(post: VendorDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updateVendor', fromData.toString(), {
      headers,
    });
  }

  getVendor(Id) {
    return this.http.get(this.url + '/getVendor?id=' + Id);
  }

  addNewStore(post: StoresDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewStore', fromData.toString(), {
      headers,
    });
  }

  getAllStores() {
    return this.http.get(this.url + '/getAllStores');
  }

  updateStore(post: StoresDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updateStore', fromData.toString(), {
      headers,
    });
  }

  getStore(Id) {
    return this.http.get(this.url + '/getStore?id=' + Id);
  }

  addNewBrand(post: BrandsDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewBrand', fromData.toString(), {
      headers,
    });
  }

  getAllBrands() {
    return this.http.get(this.url + '/getAllBrands');
  }

  updateBrand(post: BrandsDetail) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updateBrand', fromData.toString(), {
      headers,
    });
  }

  getBrand(Id) {
    return this.http.get(this.url + '/getBrand?id=' + Id);
  }

  addNewInventoryDetail(post: InventoryDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/addNewInventoryDetail',
      fromData.toString(),
      { headers }
    );
  }

  checkPriceListExist(storeId, productId) {
    return this.http.get(this.url + '/checkPriceListExist?storeId=' + storeId + "&productId=" + productId);
  }

  getAllInventoryDetails() {
    return this.http.get(this.url + '/getAllInventoryDetails');
  }

  updateInventoryDetail(post: InventoryDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(
      this.url + '/updateInventoryDetail',
      fromData.toString(),
      { headers }
    );
  }

  getInventoryDetail(Id) {
    return this.http.get(this.url + '/getInventoryDetail?id=' + Id);
  }

  getHomeProducts(selectedValues = '', searchTerm = '', CategoryId) {
    return this.http.get(
      this.url +
        '/getHomeProducts?selectedValues=' +
        selectedValues +
        '&searchTerm=' +
        searchTerm +
        '&CategoryId=' +
        CategoryId
    );
  }

  getAllProductSpecification() {
    return this.http.get(this.url + '/getAllProductSpecification');
  }

  getMaxPageNumber(selectedValues = '', searchTerm = '', CategoryId) {
    return this.http.get(
      this.url +
        '/getMaxPageNumber?selectedValues=' +
        selectedValues +
        '&searchTerm=' +
        searchTerm +
        '&CategoryId=' +
        CategoryId
    );
  }

  async addNewShoppingCartMaster() {
    const data = await this.http
      .get(this.url + '/addNewShoppingCart')
      .toPromise();

    return data;
  }
  addNewShoppingCartItem(post: CartDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;

    return this.http.post(
      this.url + '/addNewShoppingCartItem',
      fromData.toString(),
      { headers }
    );
  }
  getAllCarts(Id) {
    return this.http.get(this.url + '/getAllCarts?id=' + Id);
  }

  getProductCount(cartId) {
    return this.http.get(this.url + '/getProductCount?cartId=' + cartId);
  }

  updateShoppingCart(post: CartDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(
      this.url + '/updateShoppingCart',
      fromData.toString(),
      { headers }
    );
  }

  getCart(Id) {
    return this.http.get(this.url + '/getCart?id=' + Id);
  }

  getAllCountries() {
    return this.http.get(this.url + '/getAllCountries');
  }

  addNewPriceList(post: PriceListDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(this.url + '/addNewPriceList', fromData.toString(), {
      headers,
    });
  }

  getPrice(Id) {
    return this.http.get(this.url + '/getPrice?id=' + Id);
  }

  getAllPrices() {
    return this.http.get(this.url + '/getAllPrices');
  }

  updatePrice(post: PriceListDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updatePrice', fromData.toString(), {
      headers,
    });
  }

  getCartTotal(cartId) {
    return this.http
      .get(this.url + '/getCartTotal?cartId=' + cartId)
      .toPromise();
  }

  updateCartQuantity(Id, Quantity) {
    return this.http.get(
      this.url + '/updateCartQuantity?Id=' + Id + '&Quantity=' + Quantity
    );
  }

  userAuthentication(post: LoginDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(
      this.url + '/UserAutentication',
      fromData.toString(),
      { headers }
    );
  }

  getUser(UserId) {
    return this.http.get(this.url + '/getUser?UserId=' + UserId);
  }

  getAllUsers() {
    return this.http.get(this.url + '/getAllUsers');
  }

  getUserName(Id) {
    return this.http.get(this.url + '/getUserName?Id=' + Id);
  }

  updateUser(post: UserData) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/updateUser', fromData.toString(), {
      headers,
    });
  }

  updateLastActiveTime() {
    var LoginDate = new Date();
    var LoginDateStamp = LoginDate.getTime();
    return LoginDateStamp;
  }

  userRegister(post: UserData) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    return this.http.post(this.url + '/userRegister', fromData.toString(), {
      headers,
    });
  }

  DeleteFormItemCart(Id) {
    return this.http.get(this.url + '/DeleteFormItemCart?Id=' + Id);
  }

  DeleteAllCart(cartId) {
    return this.http.get(this.url + '/DeleteAllCart?cartId=' + cartId);
  }

  addNewOrder(cartId, UserId) {
    return this.http.get(
      this.url + '/addNewOrder?cartId=' + cartId + '&UserId=' + UserId
    );
  }

  getAllShippingAgents() {
    return this.http.get(this.url + '/getAllShippingAgents');
  }

  addNewShippingAgent(post: ShippingAgentDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/addNewShippingAgent',
      fromData.toString(),
      { headers }
    );
  }

  getShippingAgent(Id) {
    return this.http.get(this.url + '/getShippingAgent?id=' + Id);
  }

  updateShippingAgents(post: ShippingAgentDetails) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/updateShippingAgents',
      fromData.toString(),
      { headers }
    );
  }

  getOrders(UserId) {
    return this.http.get(this.url + '/getOrders?UserId=' + UserId);
  }

  getOrdersForShipping(UserId) {
    return this.http.get(this.url + '/getOrdersForShipping?UserId=' + UserId);
  }
  getOrdersForShippingFilterd(UserId, StatusId) {
    return this.http.get(
      this.url +
        '/getOrdersForShippingFiltered?UserId=' +
        UserId +
        '&StatusId=' +
        StatusId
    );
  }

  getShippingDetails(UserId) {
    return this.http.get(this.url + '/getShippingDetails?UserId=' + UserId);
  }

  getOrderMaster(UserId) {
    return this.http.get(this.url + '/getOrderMaster?UserId=' + UserId);
  }

  copyFromProductSepcification(fromProductId, productId, CategoryId) {
    return this.http.get(
      this.url +
        '/copyFromProductpecification?FromProductId=' +
        fromProductId +
        '&ProductId=' +
        productId +
        '&categoryId=' +
        CategoryId
    );
  }

  rateTheProduct(productId, storeId, userId, rateId, productReview) {
    return this.http.get(
      this.url +
        '/rateTheProduct?productId=' +
        productId +
        '&storeId=' +
        storeId +
        '&userId=' +
        userId +
        '&rateId=' +
        rateId +
        '&productReview=' +
        productReview
    );
  }

  getAllReviews(productId) {
    return this.http.get(this.url + '/getAllReviews?productId=' + productId);
  }

  getStarsPercent(productId) {
    return this.http.get(this.url + '/getStarsPercent?productId=' + productId);
  }

  addNewShippingUser(post: ShippingUserModel) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/addNewShippingUser',
      fromData.toString(),
      { headers }
    );
  }

  getShippingUsers() {
    return this.http.get(this.url + '/getShippingUsers');
  }

  updateShippingUser(post: ShippingUserModel) {
    var fromData = this.formDataEncoder(post);
    const headers = new HttpHeaders().set(
      'content-type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    ;
    return this.http.post(
      this.url + '/updateShippingUser',
      fromData.toString(),
      { headers }
    );
  }

  getShippingUser(Id) {
    return this.http.get(this.url + '/getShippingUser?id=' + Id);
  }

  getOrderDetail(Id) {
    return this.http.get(this.url + '/getOrderDetail?id=' + Id);
  }

  addDeliveryNote(
    DeliveryNote,
    OrderId,
    UserId,
    MapLocation,
    Latitude,
    Longitude
  ) {
    MapLocation = MapLocation.replace('<iframe src=', '');
    MapLocation = MapLocation.replace('></iframe>', '');
    var MapLocationEncoded = encodeURIComponent(MapLocation);
    return this.http.get(
      this.url +
        '/addDeliveryNote?UserId=' +
        UserId +
        '&OrderId=' +
        OrderId +
        '&DeliveryNote=' +
        DeliveryNote +
        '&Latitude=' +
        Latitude +
        '&Longitude=' +
        Longitude +
        '&MapLocation=' +
        MapLocationEncoded
    );
  }
  mapLocation(MapLocation) {
    return this.http.get(this.url + '/Map?MapLocation=' + MapLocation);
  }
  DeliverOrder(OrderId, UserId) {
    return this.http.get(
      this.url + '/DeliverOrder?UserId=' + UserId + '&OrderId=' + OrderId
    );
  }
  // getMapLocation(OrderId){
  //   return this.http.get(this.url + '/getMapLocation?OrderId=' + OrderId);
  // }

  async getMapLocation(OrderId) {
    const data = await this.http
      .get(this.url + '/getMapLocation?OrderId=' + OrderId)
      .toPromise();

    return data;
  }

  getProductNames(ProductName) {
    var listOfProducts = this.http
      .get(this.url + '/getProductNames?ProductName=' + ProductName)
      .pipe(
        debounceTime(500), // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map((data: any) => {
          return data.length != 0
            ? (data as any[])
            : [{ ProductName: 'No Record Found' } as any];
        })
      );
    return listOfProducts;
  }

  getWelcomePageCategory() {
    return this.http.get(this.url + '/getWelcomePageCategory');
  }

  getWelcomePageProducts() {
    return this.http.get(this.url + '/getWelcomePageProducts');
  }
}
