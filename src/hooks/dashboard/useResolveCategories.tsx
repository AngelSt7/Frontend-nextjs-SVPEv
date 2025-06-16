import { useMemo } from 'react';
import { useGetLevelCategories } from './useGetLevelCategories';

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
          id: category.id,
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
          id: category.id,
        })),
    [categoryLevelThree]
  );

  return {
    formatCategoryTwo,
    formatCategoryThree,
  };
}
