import Input from '@/src/components/ui/Input';
import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import SelectTabs from '../../ui/form/SelectTabs';
import SelectItem from '../../ui/form/SelectItem';
import ProductSearchSelector from './ProductSearchSelector';
import { StockFormData } from '@/src/types/dashboard/StockTypes';
import { ItemOption } from '@/src/types/commonTypes/commonTypes';

type StockFormProps = {
    register: UseFormRegister<StockFormData>;
    errors: FieldErrors<StockFormData>;
    watch: UseFormWatch<StockFormData>;
    setValue: UseFormSetValue<StockFormData>;
    productOptions: ItemOption[]
    suppliersOptions: ItemOption[]
};

export default function StockForm({ register, errors, watch, setValue, productOptions, suppliersOptions }: StockFormProps) {
    return (
        <div className="flex flex-col gap-4">
            <ProductSearchSelector
                label="Producto"
                data={productOptions}
                setValue={setValue}
                watch={watch}
                register={register('productos', {
                    required: 'Debe seleccionar al menos un producto',
                })}
                name="productos"
                errorMessage={errors.productos as FieldError}
                view={'/dashboard/productos'}
            />
            
            <SelectTabs
                name="id_proveedor"
                label="Proveedor"
                data={suppliersOptions}
                setValue={setValue}
                watch={watch}
                register={register('id_proveedor', {
                    required: 'Este campo es obligatorio',
                })}
                errorMessage={errors.id_proveedor}
                view={'/dashboard/proveedores'}
            />
            
            <div className="grid grid-cols-2 gap-5">
                <SelectItem
                    name="tipo_documento"
                    label="Tipo de documento"
                    data={[
                        { id: '1', label: 'Factura', activo: true },
                        { id: '2', label: 'Boleta', activo: true },
                    ]}
                    register={register('tipo_documento', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.tipo_documento}
                />
                <Input
                    type="text"
                    htmlFor="numero_documento"
                    label="N° Documento"
                    placeholder="Ej: F001-000125"
                    maxLength={11}
                    register={register('numero_documento', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'El N° de documento debe tener al menos 8 caracteres',
                        }
                    })}
                    errorMessage={errors.numero_documento}
                />
            </div>
            
            <Input
                type="textarea"
                htmlFor="observaciones"
                label="Observaciones"
                maxLength={200}
                placeholder="Detalles del ingreso"
                register={register('observaciones', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 15,
                        message: 'Debe tener al menos 15 caracteres',
                    },
                    maxLength: {
                        value: 200,
                        message: 'No debe superar los 200 caracteres',
                    },
                })}
                errorMessage={errors.observaciones}
            />
        </div>
    );
}