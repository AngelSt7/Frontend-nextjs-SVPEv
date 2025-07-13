import { useMemo } from 'react';
import { useGetLevelCategories } from '../data/useGetLevelCategories';

export default function useResolveCategories() {
  const { data: categoryLevelTwo = [] } = useGetLevelCategories({ level: 1 });
  const { data: categoryLevelThree = [] } = useGetLevelCategories({ level: 2 });

  const formatCategoryTwo = useMemo(
    () =>
      categoryLevelTwo
        .filter((category) => category.activo === 1)
        .map((category) => ({
          label: category.nombre,
          activo: category.activo,
          id: category.id ? category.id : 0,
        })),
    [categoryLevelTwo]
  );

  const formatCategoryThree = useMemo(
    () =>
      categoryLevelThree
        .filter((category) => category.activo === 1)
        .map((category) => ({
          label: category.nombre,
          activo: category.activo,
          id: category.id ? category.id : 0,
        })),
    [categoryLevelThree]
  );

  return {
    formatCategoryTwo,
    formatCategoryThree,
  };
}
