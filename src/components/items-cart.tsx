import { ShoppingCart } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function ItemsCart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <ShoppingCart />
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
          <SheetDescription>
            Adicione itens no seu carrinho para visualizá-los
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 text-center">
          <span className="text-sm">Não existem itens no seu carrinho.</span>
        </div>
        <SheetFooter>
          <Button type="submit">Finalizar compra</Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
