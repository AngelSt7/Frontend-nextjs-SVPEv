import { useMemo } from 'react';
import {
  FieldError,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { IconType } from 'react-icons';
import Errors from './Errors';

type InputProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  htmlFor: string;
  label?: string;
  register?: ReturnType<UseFormRegister<T>>;
  errorMessage?: FieldError;
  Icon?: IconType;
  variant?: 'default' | 'floating';
};

export default function Input<T extends FieldValues>({
  type,
  label,
  register,
  htmlFor,
  errorMessage,
  placeholder,
  Icon,
  variant = 'default',
}: InputProps<T>) {
  const isTextArea = type === 'textarea';

  const inputClasses = useMemo(() => {
    const base = `text-sm block w-full text-sm p-2 border border-[#afaeae] bg-[#f4f4f5] hover:bg-[#e4e4e7] rounded-md outline-none focus:ring-1 focus:ring-white/10 ${
      errorMessage ? 'ring-1 ring-[#d10b30]' : ''
    }`;

    return variant === 'floating'
      ? `${base} peer px-3 pt-6 pb-2`
      : `${base} px-3 py-2.5 pr-10 ${isTextArea ? 'min-h-[120px]' : 'h-12'}`;
  }, [errorMessage, variant, isTextArea]);

  const autoCompleteValue = useMemo(
    () => (type === 'password' ? 'new-password' : 'off'),
    [type]
  );

  const inputId = `input-${label ? label : htmlFor}`;

  return (
    <div className="flex flex-col w-full gap-2">
      {variant === 'default' && label && (
        <label htmlFor={inputId} className="overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021]">
          {label}
        </label>
      )}

      <div className="relative">
        {isTextArea ? (
          <textarea
            id={inputId}
            placeholder={variant === 'floating' ? ' ' : placeholder}
            className={inputClasses}
            {...register}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            placeholder={variant === 'floating' ? ' ' : placeholder}
            autoComplete={autoCompleteValue}
            className={inputClasses}
            {...register}
          />
        )}

        {Icon && !isTextArea && (
          <Icon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        )}
      </div>

      {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
    </div>
  );
}
