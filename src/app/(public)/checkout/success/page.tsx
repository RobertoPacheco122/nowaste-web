"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  Leaf,
  ArrowRight,
} from "lucide-react";
import dayjs from "dayjs";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetOrderByPaymentSessionId } from "./_hooks/use-get-order-by-payment-session-id";
import { useUserCart } from "@/hooks/use-user-cart";

export default function CheckoutSuccess() {
  const [isAnimated, setIsAnimated] = React.useState(false);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  const { data: orderInformations } = useGetOrderByPaymentSessionId({
    id: sessionId,
  });
  const { handleClearAllItems } = useUserCart();

  React.useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
    }, 250);

    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fireConfetti(0.2, {
      spread: 60,
    });
    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    handleClearAllItems();
  }, [handleClearAllItems]);

  const fireConfetti = (particleRatio: number, opts: confetti.Options) => {
    const count = 500;
    const defaults = {
      origin: { y: 0.7 },
    };

    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  };

  const orderPriceInformations = React.useMemo(() => {
    if (!orderInformations) return;

    const formattedSubtotalPriceInReais = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(orderInformations.subtotal / 100);

    const formattedDeliveryFeePriceInReais = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(orderInformations.deliveryFee / 100);

    const formattedServiceTaxPriceInReais = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(orderInformations.tax / 100);

    const formattedTotalPriceInReais = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(orderInformations.total / 100);

    const formattedDiscountPriceInReais = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(orderInformations.discount / 100);

    return {
      formattedSubtotalPriceInReais,
      formattedDeliveryFeePriceInReais,
      formattedServiceTaxPriceInReais,
      formattedTotalPriceInReais,
      formattedDiscountPriceInReais,
    };
  }, [orderInformations]);

  const orderItemsCount = !orderInformations
    ? 0
    : orderInformations.orderItems.reduce(
        (acc, item) => acc + item.itemQuantity,
        0
      );

  const totalOrderItemsWeightInKilograms = !orderInformations
    ? 0
    : orderInformations.orderItems.reduce(
        (acc, item) =>
          acc + (item.product.weightInGrams / 1000) * item.itemQuantity,
        0
      );

  return (
    <main className="min-h-screen">
      <div className="py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 transition-all duration-500 ${
              isAnimated
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
              Pedido confirmado! 🎉
            </h1>
            <p className="text-shadow-muted-foreground text-lg">
              Obrigado por ajudar a reduzir o desperdício de comida e apoiar o
              comércio local
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pedido #{orderInformations?.friendlyId}</CardTitle>
                  <CardDescription className="mt-1">
                    Pedido feito em{" "}
                    {dayjs(orderInformations?.orderDate)
                      .subtract(3, "hour")
                      .format("DD/MM/YYYY HH:mm")}
                  </CardDescription>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">
                  Confirmado
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Estimativa de entrega
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      30-60 minutos
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Iremos notificar você quando seu pedido estiver pronto
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Endereço de entrega
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {orderInformations?.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-green-600" />
                  Itens do pedido ({orderInformations?.orderItems.length})
                </h4>
                <div className="space-y-3">
                  {orderInformations &&
                    orderInformations.orderItems.map(
                      ({
                        product: { id },
                        productName,
                        total,
                        itemQuantity,
                      }) => {
                        const totalPriceFormattedInBrl = new Intl.NumberFormat(
                          "en-US",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        ).format(total / 100);

                        return (
                          <div key={id} className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-2xl">🥕</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {productName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {orderInformations.establishment.exhibitionName}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                x{itemQuantity}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {totalPriceFormattedInBrl}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {orderPriceInformations?.formattedSubtotalPriceInReais}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de entrega</span>
                  <span>
                    {orderPriceInformations?.formattedDeliveryFeePriceInReais}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de serviço</span>
                  <span>
                    {orderPriceInformations?.formattedServiceTaxPriceInReais}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {orderPriceInformations?.formattedTotalPriceInReais}
                  </span>
                </div>
                {orderInformations && orderInformations.discount > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800 font-semibold text-center">
                      🎉 Você economizou{" "}
                      {orderPriceInformations?.formattedDiscountPriceInReais} em
                      relação aos preços originais!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    Seu impacto ambiental
                  </h4>
                  <p className="text-sm text-green-700 mb-3">
                    Por escolher Nowaste, você ajudou a salvar alimentos
                    perfeitamente utilizáveis do desperdício. Seu pedido
                    previniu cerca de {totalOrderItemsWeightInKilograms}kg de
                    alimentos de acabar na lixeira!
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-green-700">
                    <div>
                      <span className="font-semibold">🌍 CO₂ economizado:</span>{" "}
                      Em breve
                    </div>
                    <div>
                      <span className="font-semibold">
                        💧 Água economizada:
                      </span>{" "}
                      Em breve
                    </div>
                    <div>
                      <span className="font-semibold">🌱 Impacto total:</span>{" "}
                      {orderItemsCount} alimentos salvos
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h3 className="font-semibold text-lg">O que fazer agora?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/products">
                  Continuar as compras
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="bg-transparent"
              >
                <Link href="/orders">Visualizar pedido</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Enviamos ao seu e-mail a confirmação do pedido
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
