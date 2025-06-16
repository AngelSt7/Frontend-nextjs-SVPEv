import { Product, ProductCart, SalesFormData } from '@/src/types/dashboard/SaleTypes';
import { useForm } from 'react-hook-form';
import ItemCart from './ItemCart';
import RequesteCartForm from '../form/RequestCartForm';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { dashboardCreateSaleService } from '@/src/services/dashboard/sales/register/dashboardCreateSaleService';
import { Button } from '@heroui/react';
import { useAppStore } from '@/src/store/useAppStore';
import TotalPay from './TotalPay';

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
    const toggleShowModal = useAppStore(state => state.toggleShowModal)
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SalesFormData>();

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardCreateSaleService,
        invalidateQuery: ['sales'],
        onSuccessCallback: () => toggleShowModal(),
        message: 'Venta registrado exitosamente'
    });

    const onSubmit = (data: SalesFormData) => {
        mutate({
            formData: {
                ...data,
                id_usuario: 1,
            },
            cart
        })
    }

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
