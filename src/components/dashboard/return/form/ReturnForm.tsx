import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDiscount, MdPermIdentity } from 'react-icons/md';
import SelectDate from '../../category/create/SelectDate';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';
import SelectItem from '../../ui/SelectItem';
import { ReturnFormData } from '@/src/types/dashboard/ReturnTypes';
import { useGetSuppliers } from '@/src/hooks/dashboard/useGetSuppliers';

type ReturnFormProps = {
    register: UseFormRegister<ReturnFormData>;
    errors: FieldErrors<ReturnFormData>;
    watch: UseFormWatch<ReturnFormData>;
    setValue: UseFormSetValue<ReturnFormData>;
};

export default function ReturnForm({ register, errors, watch, setValue }: ReturnFormProps) {
    const { data: categoryData = [] } = useGetCategories();
    const { data: supplierData = [] } = useGetSuppliers();
    const supplierFormated = supplierData.map(s => ({ id: s.id.toString(), label: s.razon_social, activo: s.activo }));

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-5">

                {/* Campo: Lote */}
                <Input
                    type="text"
                    placeholder="Lote"
                    htmlFor="lote"
                    label="Lote"
                    maxLength={20}
                    register={register('lote', {
                        required: 'Este campo es obligatorio',
                        maxLength: {
                            value: 20,
                            message: 'Máximo 20 caracteres',
                        }
                    })}
                    errorMessage={errors.lote}
                />

                <Input
                    type="number"
                    placeholder="Cantidad"
                    htmlFor="cantidad"
                    label="Cantidad"
                    maxLength={99}
                    register={register('cantidad', {
                        required: 'Este campo es obligatorio',
                        min: {
                            value: 1,
                            message: 'Debe ser al menos 1',
                        },
                        max: {
                            value: 99,
                            message: 'Cantidad muy grande',
                        },
                        valueAsNumber: true
                    })}
                    errorMessage={errors.cantidad}
                />
            </div>

            <SelectItem
                name="id_proveedor"
                label="Proveedor"
                data={supplierFormated}
                register={register('id_proveedor', {
                    required: 'Este campo es obligatorio',
                    valueAsNumber: true,
                })}
                watch={watch}
                setValue={setValue}
                errorMessage={errors.id_proveedor}
            />
        </div>
    );
}
