import type { ReactNode, Dispatch } from 'react'

export type BuyTheLookProviderType = {
  children: ReactNode | ReactNode[]
}

export interface BuyTheLookActions {
  state: BuyTheLookTypes
  dispatch: Dispatch<Action>
}

export interface BuyTheLookTypes {
  mainSeller: SellerProps
  lookSeller: SellerProps
}

type SellerProps = {
  id: number
  seller: number
  quantity: number
}

export type Action =
  | { type: 'SET_MAIN_SELLER'; id: number; seller: number }
  | { type: 'SET_LOOK_SELLER'; id: number; seller: number }
