import SelectItem from '../../ui/form/SelectItem';
import { useForm } from 'react-hook-form';
import { DashboardReturnSaleById } from '@/src/types/dashboard/ReturnSaleTypes';
import { status } from '@/src/utils/constants/constans';
import { resolveId } from '@/src/utils/resolves/resolveChangeStatus';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReturnSale } from '@/src/services/dashboard/return-sale/ReturnSale';
import { useModalUtils } from '@/src/hooks/modal/useModalUtils';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

type ChangeStatusFormProps = {
    defaultValues: {
        estado: DashboardReturnSaleById['estado'];
        id: DashboardReturnSaleById['id'];
    }
}

export default function ChangeStatusForm({ defaultValues } : ChangeStatusFormProps) {
    const invalidateQuery = useQueryClient()
    const { closeModal } = useModalUtils();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<{id: number, status: number}>({
        defaultValues: {
            id: defaultValues.id,
            status: resolveId(defaultValues.estado)
        }
    });
    const currentStatus = watch('status');

    useEffect(() => {
        if (currentStatus !== resolveId(defaultValues.estado)) {
            handleSubmit((data) => mutate(data))();
        }
    }, [currentStatus]);

    const { mutate } = useMutation({
        mutationFn: ReturnSale.changeStatus,
        onError: (error) => toast.error(error.message || 'Se ha producido un error'),
        onSuccess: () => {
            toast.success('Estado cambiado exitosamente')
            invalidateQuery.invalidateQueries({ queryKey: ['return-sale', defaultValues.id.toString()] })
            invalidateQuery.invalidateQueries({ queryKey: ['returns-sales'] })
            closeModal()
        }
    });

    return (
        <form className='mb-3' onSubmit={handleSubmit((data) => mutate(data))}>
            <SelectItem
                name="status"
                label="Estado"
                data={status}
                watch={watch}
                setValue={setValue}
                register={{ ...register('status', { required: 'Este campo es obligatorio', valueAsNumber: true }) }}
                errorMessage={errors.status}
            />
        </form>
    )
}
