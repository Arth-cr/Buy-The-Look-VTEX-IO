import React from 'react'
import { useMutation } from 'react-apollo'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { canUseDOM } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'

import { useBuyTheLookContext } from '../../../../contexts/BuyTheLookContext/BuyTheLookContext'
import ADD_ITEM from '../../../../queries/addToCartCustom.graphql'
import getFormattedPrice from '../../../../utils/getFormatedPrice'
import { BuyButtonProps, HANDLES } from '../types'

export const BuyButton = ({
  text,
  buttonTitle,
  finalPrice,
}: BuyButtonProps) => {
  if (!canUseDOM) {
    return <></>
  }
  const { handles } = useCssHandles(HANDLES)
  const { state } = useBuyTheLookContext()
  const { setOrderForm } = useOrderForm()

  const [addToCart] = useMutation(ADD_ITEM, {
    onCompleted: (data: any) => {
      const orderFormData = data?.addToCart
      setOrderForm((prevOrderForm: any) => {
        return {
          ...prevOrderForm,
          ...orderFormData,
        }
      })
    },
  })

  const handleAddToCart = () => {
    state.lookTwoSeller
      ? addToCart({
          variables: {
            items: [state.mainSeller, state.lookSeller, state.lookTwoSeller],
          },
        })
      : addToCart({
          variables: {
            items: [state.mainSeller, state.lookSeller],
          },
        })

    const minicart = document.querySelector(
      '.vtex-minicart-2-x-minicartContainer .vtex-minicart-2-x-openIconContainer'
    ) as HTMLElement

    minicart?.click()
  }

  return (
    <div className={handles.BuyTheLook_buttonTextContainer}>
      <p className={handles.BuyTheLook_buttonText}>
        {text}{' '}
        <strong className={handles.BuyTheLook_buttonPrice}>
          {getFormattedPrice(finalPrice)}
        </strong>
      </p>
      <button
        onClick={handleAddToCart}
        className={handles.BuyTheLook_button}
        disabled={state.lookSeller.id === 0}
      >
        {buttonTitle}
      </button>
    </div>
  )
}
