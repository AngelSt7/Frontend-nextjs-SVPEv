export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
}
