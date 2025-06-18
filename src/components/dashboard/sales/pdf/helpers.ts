export const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

export const formatCurrency = (amount: number) => {
    return `S/ ${amount.toFixed(2)}`;
};