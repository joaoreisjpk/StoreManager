interface createSale {
  product_id: number;
  quantity: number;
}

interface createSalesResponse {
  id: number;
  itemSold: createSale[];
}

interface getSaleList {
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
  id: number;
  itemUpdated: createSale[];
}

