export type TaxPaymentData = {
  shipId: string
  shipName: string
  starId: string
  amount: number
  timestamp: Date
}

export type TaxPayment = TaxPaymentData & {
  id: string
}