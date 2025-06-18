import { Product, ProductCart, SalesFormData } from '@/src/types/dashboard/SaleTypes';
import { useForm } from 'react-hook-form';
import ItemCart from './ItemCart';
import RequesteCartForm from '../form/RequestCartForm';
import { dashboardCreateSaleService } from '@/src/services/dashboard/sales/register/dashboardCreateSaleService';
import { Button } from '@heroui/react';
import { useAppStore } from '@/src/store/useAppStore';
import TotalPay from './TotalPay';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pdf } from '@react-pdf/renderer';
import file from 'file-saver';
import FacturaPDF from '../../pdf/FacturaPDF';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type RequestCartFormProps = {
    step: boolean,
    cart: ProductCart[],
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    deleteProduct: (id: Product['id']) => void,
    total: number
    igv: number
}

export default function RequestCartForm({ cart, increaseQuantity, decreaseQuantity, deleteProduct, step, total, igv }: RequestCartFormProps) {
    const router = useRouter()
    const toggleShowModal = useAppStore(state => state.toggleShowModal)
    const clearCart = useAppStore(state => state.clearCart)
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SalesFormData>();
    const invalidQuery = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: dashboardCreateSaleService,
        onError: () => {
            toast.error('Error al registrar la venta')
        },
        onSuccess: async (data) => {
            clearCart()
            invalidQuery.invalidateQueries({ queryKey: ['sales', 'products-sales'] })
            const blob = await pdf( <FacturaPDF sale={data} products={cart} />).toBlob();
            file.saveAs(blob, `boleta-${data.id}.pdf`);
            toggleShowModal()
            toast.success('Venta registrada exitosamente')
        }
    })
    
    const onSubmit = (data: SalesFormData) =>  mutate({ formData: { ...data, id_usuario: 1 }, cart})
    
    return (
        <>
            {step ? (
                cart.length > 0 ? (
                    <>
                        {cart.map((item) => (
                            <ItemCart
                                key={item.id}
                                item={item}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                deleteProduct={deleteProduct}
                            />
                        ))}

                        <TotalPay igv={igv} total={total} />
                    </>
                ) : (
                    <p className="text-center text-zinc-600 dark:text-zinc-400">
                        No hay productos en el carrito, agregue alguno
                    </p>
                )
            ) : (
                <form
                    className="flex flex-col justify-between gap-3 flex-1 mt-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <RequesteCartForm
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                    />

                    <TotalPay igv={igv} total={total} />

                    <div className="w-full flex gap-4 justify-end mt-3">
                        <Button
                            className="w-full bg-[#373737] text-white font-bold"
                            color="success"
                            type="submit"
                        >
                            Crear venta
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}
