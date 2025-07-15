import { useMemo } from 'react';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
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
  maxLength?: number;
  max?: number;
  disabled?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  pattern?: string;
  isLogin?: boolean;
};

export default function Input<T extends FieldValues>({
  isLogin,
  type,
  label,
  register,
  htmlFor,
  errorMessage,
  placeholder,
  Icon,
  maxLength,
  max,
  disabled = false,
  variant = 'default',
  inputMode,
  pattern,
}: InputProps<T>) {
  const isTextArea = type === 'textarea';
  const isDark = !isLogin;

  const inputClasses = useMemo(() => {
    const base = [
      'text-sm block w-full p-2 border rounded-md outline-none focus:ring-1',
      errorMessage ? 'border-[#d10b30]' : isDark ? 'border-[#3f3f46]' : 'border-[#afaeae]',
      errorMessage ? 'ring-[#d10b30]' : 'focus:ring-white/10',
      isDark
        ? 'bg-[#242428] hover:bg-[#3f3f46] text-[#e5e5e5]'
        : 'bg-[#f4f4f5] hover:bg-[#e4e4e7] text-[#202021]',
    ].join(' ');

    return variant === 'floating'
      ? `${base} peer px-3 pt-6 pb-2`
      : `${base} px-3 py-2.5 pr-10 ${isTextArea ? 'min-h-[120px]' : 'h-[50px]'}`;
  }, [errorMessage, variant, isTextArea, isDark]);

  const autoCompleteValue = useMemo(
    () => (type === 'password' ? 'new-password' : 'off'),
    [type]
  );

  const inputId = `input-${label ? label : htmlFor}`;

  return (
    <div className="flex flex-col w-full gap-2">
      {variant === 'default' && label && (
        <label
          htmlFor={inputId}
          className={`overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold ${
            isDark ? 'text-[#c5c5c7]' : 'text-[#202021]'
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {isTextArea ? (
          <textarea
            id={inputId}
            maxLength={maxLength}
            placeholder={variant === 'floating' ? ' ' : placeholder}
            className={inputClasses}
            disabled={disabled}
            {...register}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            disabled={disabled}
            maxLength={maxLength}
            inputMode={inputMode}
            pattern={pattern}
            min={type === 'number' ? 0 : undefined}
            max={type === 'number' ? max : undefined}
            placeholder={variant === 'floating' ? ' ' : placeholder}
            autoComplete={autoCompleteValue}
            className={inputClasses}
            onKeyDown={(e) => {
              if (type === 'number' && (e.key === '-' || e.key === 'e')) {
                e.preventDefault();
              }
            }}
            {...register}
          />
        )}

        {Icon && !isTextArea && (
          <Icon
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
            size={20}
          />
        )}
      </div>

      {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
    </div>
  );
}
