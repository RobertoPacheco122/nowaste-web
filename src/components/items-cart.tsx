"use client";

import React from "react";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

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
import { useUserCart } from "@/hooks/use-user-cart";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { calculateProductPriceInformations } from "@/utils/product/calculate-product-price-informations";

export function ItemsCart() {
  const {
    items,
    handleRemoveItem,
    handleAddItemQuantity,
    handleClearAllItems,
  } = useUserCart();

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
        {items.length === 0 ? (
          <div className="px-4 text-center">
            <span className="text-sm">Não existem itens no seu carrinho.</span>
          </div>
        ) : (
          <div className="px-4 space-y-4">
            {items.map(
              ({
                quantity,
                product: {
                  id,
                  name,
                  establishment,
                  quantityInStock,
                  actualPriceHistory: {
                    price,
                    salePrice,
                    showDiscountAsPercentage,
                  },
                },
              }) => {
                const {
                  dicountInPercentage,
                  formattedDiscountPriceInBrl,
                  formattedSalePriceInBrl,
                  formattedSubtotalSalePriceInBrl,
                  formattedSubtotalPriceWhithoutDiscountInBrl,
                } = calculateProductPriceInformations(
                  price,
                  salePrice,
                  quantity
                );

                const hasProductAnyDiscount = salePrice < price;

                return (
                  <Card className="p-0" key={id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-3xl">🍕</span>
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                href={`/products/${id}`}
                                className="font-semibold text-lg hover:text-green-600 transition-colors"
                              >
                                {name}
                              </Link>
                              <Link
                                href={`/establishment/${establishment.id}`}
                                className="text-sm text-gray-500 hover:text-green-600 transition-colors block"
                              >
                                por {establishment.exhibitionName}
                              </Link>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {hasProductAnyDiscount && (
                            <div className="flex items-center space-x-4">
                              <Badge
                                variant={"destructive"}
                                className="font-semibold"
                              >
                                {showDiscountAsPercentage
                                  ? `${dicountInPercentage}%`
                                  : formattedDiscountPriceInBrl}
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemQuantity(id, -1)}
                                disabled={quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {quantity}
                              </span>
                              <Button
                                className="cursor-pointer"
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddItemQuantity(id, 1)}
                                disabled={
                                  !quantityInStock
                                    ? false
                                    : quantity >= quantityInStock
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {formattedSalePriceInBrl} cada
                            </div>
                          </div>
                          <div className=" space-x-2 text-right">
                            <span className="font-semibold text-green-600">
                              Subtotal: {formattedSubtotalSalePriceInBrl}
                            </span>
                            {hasProductAnyDiscount && (
                              <span className="text-sm text-gray-500 line-through">
                                {formattedSubtotalPriceWhithoutDiscountInBrl}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        )}
        <SheetFooter>
          <Button className="cursor-pointer">Finalizar compra</Button>
          <Button
            className="cursor-pointer"
            onClick={handleClearAllItems}
            variant={"destructive"}
            disabled={items.length === 0}
          >
            <Trash2 /> Limpar carrinho
          </Button>
          <SheetClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Fechar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
