import React, { useEffect, useState } from 'react'
import { Collapsible } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

import { useBuyTheLookContext } from '../../../../contexts/BuyTheLookContext/BuyTheLookContext'
import { HANDLES, ProductContainerProps } from '../types'

export const ProductContainer = ({
  image,
  name,
  skus,
  productType,
}: ProductContainerProps) => {
  const { handles } = useCssHandles(HANDLES)
  const { dispatch } = useBuyTheLookContext()
  const [skuID, setSkuID] = useState<number | undefined>(skus?.[0].sku)
  const [size, setSize] = useState<string>('Tamanho')
  const [dropdown, setDropdown] = useState<boolean>(false)

  const selectedSku = skus?.find(sku => {
    return sku.sku === skuID
  })

  function setSellers() {
    const type =
      productType === 'main'
        ? 'SET_MAIN_SELLER'
        : productType === 'lookOne'
        ? 'SET_LOOK_SELLER'
        : 'SET_LOOKTWO_SELLER'

    dispatch({
      type,
      id: selectedSku?.sku ?? 0,
      seller: selectedSku?.sellerId ?? 0,
    })
  }

  useEffect(() => {
    setSellers()
  }, [skuID])

  return (
    <article
      style={{ maxWidth: '432px' }}
      className={handles.BuyTheLook_product}
    >
      <img
        src={image}
        alt={name}
        style={{ objectFit: 'cover', width: '432px', height: '627px' }}
        className={handles.BuyTheLook_productImage}
      />
      <h2 className={handles.BuyTheLook_productName}>{name}</h2>
      <p className={handles.BuyTheLook_productPrice}>
        {skus?.[0].bestPriceFormated}
      </p>

      <Collapsible
        header={<span>{size}</span>}
        isOpen={dropdown}
        onClick={() => setDropdown(!dropdown)}
        align={'right'}
      >
        {skus?.map(sku => {
          if (!sku.available) {
            return null
          }
          return (
            <label
              htmlFor={`${name}-${sku.skuname}`}
              key={`${name}-${sku.skuname}`}
              className={handles.BuyTheLook_productLabel}
            >
              <input
                type="radio"
                name={productType === 'main' ? 'tamanhoMain' : 'tamanhoLook'}
                id={`${name}-${sku.skuname}`}
                value={sku.sku}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSkuID(+e.target.value)
                  setSize(sku.skuname)
                  setDropdown(!dropdown)
                }}
                className={handles.BuyTheLook_productInput}
              />
              {sku.skuname}
            </label>
          )
        })}
      </Collapsible>
    </article>
  )
}
