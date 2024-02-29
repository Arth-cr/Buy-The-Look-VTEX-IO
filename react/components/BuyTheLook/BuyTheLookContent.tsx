import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useCssHandles } from 'vtex.css-handles'

import ProductService from '../../../services/ProductService'
import { ProductContainer } from './components/ProductContainer'
import { BuyButton } from './components/BuyButton'
import { BuyTheLookProps, HANDLES, ProductSkuProps } from './types'

export const BuyTheLookContent = ({
  title,
  message,
  buttonTitle,
}: BuyTheLookProps) => {
  const service = new ProductService()
  const { product } = useProduct() as Partial<ProductContextState>
  const { handles } = useCssHandles(HANDLES)

  const [
    firstLookProduct,
    setFirstLookProduct,
  ] = useState<ProductSkuProps | null>(null)
  const [
    secondLookProduct,
    setSecondLookProduct,
  ] = useState<ProductSkuProps | null>(null)
  const [mainProduct, setMainProduct] = useState<ProductSkuProps | null>(null)

  const lookProductID = product?.properties
    .find(item => {
      return item.name === 'Compre o Look'
    })
    ?.values[0].split(', ')

  async function getProducts() {
    const responseFirstLook = await service.GetProductSkus(lookProductID?.[0])
    const responseSecondLook = await service.GetProductSkus(lookProductID?.[1])
    const responseMain = await service.GetProductSkus(product?.productId)
    setMainProduct(responseMain)
    setFirstLookProduct(responseFirstLook)
    setSecondLookProduct(responseSecondLook)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const mainBestPrice = mainProduct?.skus?.[0]?.bestPrice ?? 0
  const firstLookBestPrice = firstLookProduct?.skus?.[0]?.bestPrice ?? 0
  const secondLookBestPrice = secondLookProduct?.skus?.[0]?.bestPrice ?? 0

  const finalPriceOneProduct = (mainBestPrice + firstLookBestPrice) / 100
  const finalPriceTwoProducts =
    (mainBestPrice + firstLookBestPrice + secondLookBestPrice) / 100

  if (!lookProductID) {
    console.log('Produto sem compre junto cadastrado')
    return null
  }

  return (
    <section
      className={`flex justify-center flex-column items-center mw9-xl ml-auto mr-auto mt-0 mb-0 ${handles.BuyTheLook_container}`}
    >
      <h1 className={handles.BuyTheLook_title}>{title}</h1>

      <div
        className={`flex justify-center items-center ${handles.BuyTheLook_productContainer}`}
      >
        <ProductContainer
          productType="main"
          image={mainProduct?.skus?.[0].image.replace('292-292', '1000-1000')}
          name={mainProduct?.name}
          skus={mainProduct?.skus}
        />
        <p className={handles.BuyTheLook_productSeparator}>+</p>
        <ProductContainer
          productType="lookOne"
          image={firstLookProduct?.skus?.[0].image.replace(
            '292-292',
            '1000-1000'
          )}
          name={firstLookProduct?.name}
          skus={firstLookProduct?.skus}
        />

        {secondLookProduct && (
          <>
            <p className={handles.BuyTheLook_productSeparator}>+</p>
            <ProductContainer
              productType="lookTwo"
              image={secondLookProduct?.skus?.[0].image.replace(
                '292-292',
                '1000-1000'
              )}
              name={secondLookProduct?.name}
              skus={secondLookProduct?.skus}
            />
          </>
        )}
        <p className={handles.BuyTheLook_productSeparator}>=</p>
        <BuyButton
          buttonTitle={buttonTitle}
          text={message}
          finalPrice={
            secondLookProduct ? finalPriceTwoProducts : finalPriceOneProduct
          }
        />
      </div>
    </section>
  )
}
