import { User, Button } from "@heroui/react";
import { DashboardProduct } from "@/src/types/dashboard/ProductTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { formatCurrency } from "@/src/utils/format/formatCurrency";
import { Product } from "@/src/types/dashboard/SaleTypes";

export const renderCellSaleProduct = ( 
  item: DashboardProduct,
  columnKey: React.Key,
  addProduct?: (product: Product) => void
) => {
  const cellValue = item[columnKey as keyof typeof item]
  if (item.activo !== 1) return null;
  switch (columnKey) {
    case "nombre":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "/images/product-provisional.jpeg",
          }}
          description={item.fecha_creacion && formatDate(item.fecha_creacion)}
          name={cellValue}
        >
          {item.fecha_creacion}
        </User>
      );

    case "precio_venta":
      return (
        <p>{formatCurrency(item.precio_venta)}</p>
      )

    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Button color="warning" size="sm" variant="flat"
            onPress={() => addProduct!({
              id: item.id,
              nombre: item.nombre,
              precio_venta: item.precio_venta,
              min_stock: item.min_stock,
              stock_actual: item.stock_actual,
              nombre_categoria: item.nombre_categoria,
              nombre_marca: item.nombre_marca,  
            })}
          >
            Agregar al carrito
          </Button>
        </div>
      );
    default:
      return cellValue;
  }
};
