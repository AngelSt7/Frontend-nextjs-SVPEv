import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SalesFormData } from '@/src/types/dashboard/SaleTypes';
import SelectTabs from '../../../stock/form/SelectTabs';
import { useGetClients } from '@/src/hooks/dashboard/useGetClients';
import SelectItem from '../../../ui/SelectItem';

type RequesteCartFormProps = {
    register: UseFormRegister<SalesFormData>;
    errors: FieldErrors<SalesFormData>;
    watch: UseFormWatch<SalesFormData>;
    setValue: UseFormSetValue<SalesFormData>;
};

export default function RequesteCartForm({ register, errors, watch, setValue }: RequesteCartFormProps) {
    const { data: Clients = [] } = useGetClients()
    const formatClients = Clients.map(client => ({
        label: client.nombre + ' ' + client.apellido,
        value: client.id,
    }))
    return (
        <div className="flex flex-col gap-3">


                <SelectTabs
                    name="id_cliente"
                    label="Cliente"
                    data={formatClients}
                    setValue={setValue}
                    watch={watch}
                    register={register('id_cliente', {
                        required: 'Este campo es obligatorio',
                    })}
                    errorMessage={errors.id_cliente}
                />

                <SelectItem
                    name="id_metodo_pago"
                    label="Método de pago"
                    data={[
                        { id: 1, label: 'Efectivo', activo: 1 },
                        { id: 2, label: 'Yape', activo: 1 },
                        { id: 3, label: 'Transferencia', activo: 1 },
                        { id: 4, label: 'Visa', activo: 1 },
                    ]}
                    register={register('id_metodo_pago', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.id_metodo_pago}
                />
        </div>
    );
}
