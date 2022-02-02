interface basicSale {
  product_id: number;
  quantity: number;
}

interface createSalesResponse {
  id: number;
  itemsSold: basicSale[];
}

interface getSaleList {
  sale_id: number;
  date: Date;
  product_id: number;
  quantity: number
}

interface getSaleListResponse {
  saleId: number;
  date: Date;
  product_id: number;
  quantity: number
}

interface getSaleId {
  date: Date;
  product_id: number;
  quantity: number
}

interface updateSalesResponse {
  saleId: number;
  itemUpdated: basicSale[];
}

export { basicSale, createSalesResponse, getSaleId, getSaleList, updateSalesResponse, getSaleListResponse }