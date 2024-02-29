/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  FC,
  Reducer,
  useContext,
  useReducer,
} from 'react'

import {
  Action,
  BuyTheLookActions,
  BuyTheLookProviderType,
  BuyTheLookTypes,
} from './types'

const initialValues: BuyTheLookTypes = {
  mainSeller: {
    id: 0,
    seller: 0,
    quantity: 1,
  },
  lookSeller: {
    id: 0,
    seller: 0,
    quantity: 1,
  },
}

const reducer: Reducer<BuyTheLookTypes, Action> = (
  state: BuyTheLookTypes,
  action: Action
) => {
  switch (action.type) {
    case 'SET_MAIN_SELLER': {
      return {
        ...state,
        mainSeller: {
          id: action.id,
          seller: action.seller,
          quantity: 1,
        },
      }
    }
    case 'SET_LOOK_SELLER': {
      return {
        ...state,
        lookSeller: {
          id: action.id,
          seller: action.seller,
          quantity: 1,
        },
      }
    }
    case 'SET_LOOKTWO_SELLER': {
      return {
        ...state,
        lookTwoSeller: {
          id: action.id,
          seller: action.seller,
          quantity: 1,
        },
      }
    }
    default: {
      return state
    }
  }
}

const BuyTheLookContext = createContext<BuyTheLookActions>(
  {} as BuyTheLookActions
)

const BuyTheLookProvider: FC<BuyTheLookProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)

  return (
    <BuyTheLookContext.Provider value={{ state, dispatch }}>
      {children}
    </BuyTheLookContext.Provider>
  )
}

const useBuyTheLookContext = () => {
  const context = useContext(BuyTheLookContext)

  if (!context) {
    throw new Error('useBuyTheLookContext must be used within a state')
  }

  return context
}

export { BuyTheLookProvider, useBuyTheLookContext }
