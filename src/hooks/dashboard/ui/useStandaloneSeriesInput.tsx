import { useState } from "react";

type StandaloneSeriesInput = {
  series: string[];
  onSeriesChange: (series: string[]) => void;
}

export function useStandaloneSeriesInput({ series, onSeriesChange }: StandaloneSeriesInput) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (!series.includes(newTag)) {
                onSeriesChange([...series, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onSeriesChange(series.filter(tag => tag !== tagToRemove));
    };

    return {
        inputValue,
        setInputValue,
        handleKeyDown,
        removeTag
    }

}