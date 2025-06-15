import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';

type ReturnSaleFormProps = {
    register: UseFormRegister<ReturnSaleFormData>;
    errors: FieldErrors<ReturnSaleFormData>;
    watch: UseFormWatch<ReturnSaleFormData>;
    setValue: UseFormSetValue<ReturnSaleFormData>;
};

export default function ReturnSaleForm({ register, errors}: ReturnSaleFormProps) {

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-5">

                {/* Cantidad */}
                <Input
                    type="number"
                    placeholder="Cantidad"
                    htmlFor="cantidad"
                    label="Cantidad"
                    register={register('cantidad', {
                        required: 'Este campo es obligatorio',
                        min: {
                            value: 1,
                            message: 'Debe ser al menos 1',
                        },
                        valueAsNumber: true,
                    })}
                    errorMessage={errors.cantidad}
                />

                {/* Motivo */}
                <Input
                    type="text"
                    placeholder="Motivo de la devolución"
                    htmlFor="motivo"
                    label="Motivo"
                    register={register('motivo')}
                    errorMessage={errors.motivo}
                />
            </div>

        </div>
    );
}
