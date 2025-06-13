type Discounts = {
    arrayDiscounts : { categoria: string; porcentaje: number }[]
}
const discounts = localStorage.getItem('discounts')
const arrayDiscounts : Discounts['arrayDiscounts'] = JSON.parse(discounts as string)
export const formatProductToStore = ( arrayDiscounts : Discounts['arrayDiscounts'] ) => {
    
}