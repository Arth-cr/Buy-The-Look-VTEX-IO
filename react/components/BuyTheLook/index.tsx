import React from 'react'

import { BuyTheLookProvider } from '../../../contexts/BuyTheLookContext/BuyTheLookContext'
import { BuyTheLookContent } from './BuyTheLookContent'
import { BuyTheLookProps } from './types'

export const BuyTheLook = ({
  title,
  message,
  buttonTitle,
}: BuyTheLookProps) => {
  return (
    <BuyTheLookProvider>
      <BuyTheLookContent
        title={title}
        message={message}
        buttonTitle={buttonTitle}
      />
    </BuyTheLookProvider>
  )
}
