
import { HeroUIProvider } from "@heroui/react"; // IMPORT CORRECTO

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
