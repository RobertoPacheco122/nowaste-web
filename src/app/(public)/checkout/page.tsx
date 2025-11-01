"use client";

import React from "react";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Star,
  CreditCard,
  Truck,
  Lock,
  MoveUpRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckoutIntro } from "./_components/checkout-into";
import { calculateProductPriceInformations } from "@/utils/product/calculate-product-price-informations";
import { useUserCart } from "@/hooks/use-user-cart";
import { useUserAddresses } from "@/hooks/use-user-addresses";
import { AddressType } from "@/api/address/register-address";
import { useCreateCheckoutSection } from "@/hooks/use-create-checkout-section";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterOrder } from "./_hooks/use-register-order";
import {
  PaymentMethod,
  RegisterOrderRequest,
} from "@/api/order/register-order";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : i < rating
          ? "fill-yellow-400/50 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
};

export default function Checkout() {
  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);
  const { items, handleRemoveItem, handleAddItemQuantity } = useUserCart();

  const { data: addresses } = useUserAddresses();

  const deliveryAddress =
    addresses?.find(({ addressType }) => addressType === AddressType.home) ||
    addresses?.[0];

  const { registerOrderMutation } = useRegisterOrder();
  const { createCheckoutSectionMutation } = useCreateCheckoutSection();

  const handleMakePayment = async () => {
    if (!deliveryAddress) {
      toast.error(
        "Cadastre e selecione um endereço de entrega antes de finalizar o pedido."
      );

      return;
    }

    if (!items || items.length === 0) {
      toast.error("Adicione produtos ao carrinho antes de finalizar o pedido.");

      return;
    }

    try {
      setIsLoadingPayment(true);

      const registerOrderPayload: RegisterOrderRequest = {
        addressId: deliveryAddress.id,
        establishmentId: items[0].product.establishment.id,
        items: items.map(({ quantity, product: { id } }) => {
          return {
            productId: id,
            itemQuantity: quantity,
          };
        }),
        orderDate: new Date().toISOString(),
        paymentMethod: PaymentMethod.creditCard,
        observations: "",
      };

      const { data: orderInformations, status: orderInformationsStatus } =
        await registerOrderMutation(registerOrderPayload);

      if (orderInformationsStatus !== 201)
        throw new Error(
          "An error occurred while registering the order. Error code: " +
            orderInformationsStatus
        );

      const { data, status } = await createCheckoutSectionMutation({
        orderId: orderInformations.orderId,
      });

      if (status !== 201)
        throw new Error(
          "An error occurred while making the payment. Error code: " + status
        );

      window.location.href = data.sessionUrl;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setIsLoadingPayment(false);
    }
  };

  const orderPriceInformations = React.useMemo(() => {
    if (!items || items.length === 0) return;

    const subtotalSalePriceInCents = items.reduce(
      (acc, item) =>
        acc + item.product.actualPriceHistory.salePrice * item.quantity,
      0
    );

    const subtotalOriginalPriceInCents = items.reduce(
      (acc, item) =>
        acc + item.product.actualPriceHistory.price * item.quantity,
      0
    );

    const discountsInCents =
      subtotalOriginalPriceInCents - subtotalSalePriceInCents;

    const taxPerOrderInCents = 100;

    const deliveryFeeInCents =
      items[0].product.establishment.deliveryFeeInCents;

    const totalPriceInCents =
      subtotalSalePriceInCents + deliveryFeeInCents + taxPerOrderInCents;

    const formattedSubtotalSalePriceInBrl = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(subtotalSalePriceInCents / 100);

    const formattedDiscountsPriceInBrl = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(discountsInCents / 100);

    const taxPerOrderInBrl = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(taxPerOrderInCents / 100);

    const formattedDeliveryFeeInBrl = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(deliveryFeeInCents / 100);

    const formattedTotalPriceInBrl = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalPriceInCents / 100);

    return {
      formattedValues: {
        subtotalSalePriceInBrl: formattedSubtotalSalePriceInBrl,
        discountsPriceInBrl: formattedDiscountsPriceInBrl,
        deliveryFeeInBrl: formattedDeliveryFeeInBrl,
        totalPriceInBrl: formattedTotalPriceInBrl,
        taxPerOderInBrl: taxPerOrderInBrl,
      },
      inCentsValues: {
        subtotalSalePrice: subtotalSalePriceInCents,
        discounts: discountsInCents,
        deliveryFeePrice: deliveryFeeInCents,
        totalPrice: totalPriceInCents,
        taxPerOrder: taxPerOrderInCents,
      },
    };
  }, [items]);

  return (
    <main className="min-h-screen">
      <CheckoutIntro />

      <div className="container m-auto py-4 px-4">
        <section className="py-8">
          {items.length === 0 && (
            <div>
              <span className="text-lg text-muted-foreground flex items-center gap-2">
                Seu carrinho está vazio, vá para a página de{" "}
                <Link
                  className="underline font-semibold  gap-1 flex items-center"
                  href="/products"
                >
                  Produtos <MoveUpRight className="h-4 w-4" />
                </Link>{" "}
                e aproveite nossas ofertas.
              </span>
            </div>
          )}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
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
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-2">
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
                                  <div className="flex items-center space-x-1">
                                    {renderStars(establishment.averageRating)}{" "}
                                    <span className="text-sm text-muted-foreground">
                                      {`(${establishment.averageRating})`}
                                    </span>
                                  </div>
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
                                    onClick={() =>
                                      handleAddItemQuantity(id, -1)
                                    }
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
                                    {
                                      formattedSubtotalPriceWhithoutDiscountInBrl
                                    }
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

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cupom de desconto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite aqui seu cupom de desconto"
                      className="flex-1"
                    />
                    <Button disabled={true}>Aplicar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        {
                          orderPriceInformations?.formattedValues
                            .subtotalSalePriceInBrl
                        }
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Taxa de entrega</span>
                      <span>
                        {
                          orderPriceInformations?.formattedValues
                            .deliveryFeeInBrl
                        }
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Taxa de serviço</span>
                      <span>
                        {
                          orderPriceInformations?.formattedValues
                            .taxPerOderInBrl
                        }
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-green-500">
                      <span>Descontos</span>
                      <span>
                        -
                        {
                          orderPriceInformations?.formattedValues
                            .discountsPriceInBrl
                        }
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        {
                          orderPriceInformations?.formattedValues
                            .totalPriceInBrl
                        }
                      </span>
                    </div>

                    {orderPriceInformations &&
                      orderPriceInformations?.inCentsValues.discounts > 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          Você economizou{" "}
                          {
                            orderPriceInformations.formattedValues
                              .discountsPriceInBrl
                          }{" "}
                          em relação aos preços originais dos produtos!
                        </div>
                      )}
                  </div>

                  <Separator />

                  <Button
                    disabled={
                      items.length === 0 ||
                      isLoadingPayment ||
                      deliveryAddress === null
                    }
                    size="lg"
                    className="w-full cursor-pointer"
                    onClick={handleMakePayment}
                  >
                    {isLoadingPayment ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <CreditCard className="h-4 w-4" />
                    )}
                    Realizar pagamento
                  </Button>

                  {/* Security Notice */}
                  <div className="text-xs text-gray-500 text-center">
                    <span className="flex items-center justify-center gap-2">
                      <Lock className="h-4 w-4" /> Os seus dados de pagamento
                      estão protegidos e seguros
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span>Informações de entrega</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>
                      {deliveryAddress?.streetName}, {deliveryAddress?.number} -{" "}
                      {deliveryAddress?.neighborhood}, {deliveryAddress?.city} -{" "}
                      {deliveryAddress?.state}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>45 - 60 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
