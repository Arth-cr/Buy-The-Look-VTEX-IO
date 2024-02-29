export interface ProductSkuProps {
  available: boolean
  dimensions: string[]
  name: string
  productId: number
  skus: Skus[]
}

export interface BuyTheLookProps {
  title: string
  message: string
  buttonTitle: string
}

export interface ProductContainerProps {
  image?: string
  name?: string
  skus?: Skus[]
  productType: 'main' | 'lookOne' | 'lookTwo'
}

type Skus = {
  available: boolean
  bestPrice: number
  bestPriceFormated: string
  image: string
  skuname: string
  sku: number
  sellerId: number
}

export interface BuyButtonProps {
  text: string
  buttonTitle: string
  finalPrice: number
}

export const HANDLES = [
  'BuyTheLook_container',
  'BuyTheLook_title',
  'BuyTheLook_productContainer',
  'BuyTheLook_productSeparator',
  'BuyTheLook_product',
  'BuyTheLook_productImage',
  'BuyTheLook_productName',
  'BuyTheLook_productPrice',
  'BuyTheLook_productInput',
  'BuyTheLook_productLabel',
  'BuyTheLook_buttonTextContainer',
  'BuyTheLook_buttonText',
  'BuyTheLook_buttonPrice',
  'BuyTheLook_button',
] as const
