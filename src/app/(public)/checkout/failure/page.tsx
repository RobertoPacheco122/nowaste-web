"use client";

import React from "react";

import { useSearchParams } from "next/navigation";
import {
  Package,
  AlertTriangle,
  CircleX,
  RefreshCw,
  HelpCircle,
  Mail,
  Phone,
  RotateCcw,
} from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetOrderById } from "@/hooks/use-get-order-by-id";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCreateCheckoutSection } from "@/hooks/use-create-checkout-section";

export default function CheckoutFailure() {
  const [isRetryingPayment, setIsRetryingPayment] = React.useState(false);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id") || "";

  const { data: orderInformations } = useGetOrderById({
    id: orderId,
  });
  const { createCheckoutSectionMutation } = useCreateCheckoutSection();

  const handleRetryPayment = async () => {
    if (!orderId) return;

    try {
      setIsRetryingPayment(true);

      const { data, status } = await createCheckoutSectionMutation({
        orderId,
      });

      if (status !== 201)
        throw new Error(
          "An error occurred while retrying the payment. Error code: " + status
        );

      window.location.href = data.sessionUrl;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      setIsRetryingPayment(false);
    }
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

  return (
    <main className="min-h-screen">
      <div className="py-12 bg-gradient-to-b">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className={`text-center mb-8`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
              <CircleX className="h-12 w-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-2">
              Erro no pagamento
            </h1>
            <p className="text-muted-foreground text-lg">
              Não foi possível processar o pagamento do seu pedido.
            </p>
          </div>

          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-900">
              Pagamento não processado
            </AlertTitle>
            <AlertDescription className="text-red-700">
              O seu pedido encontra-se registrado e pendente. Verifique se
              possui saldo suficiente em seu cartão e tente novamente. Caso não
              queira prosseguir, cancele o pedido.
            </AlertDescription>
          </Alert>

          {/* Order Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pedido #{orderInformations?.friendlyId}</CardTitle>
                  <CardDescription className="mt-1">
                    <p>
                      Pedido feito em{" "}
                      {dayjs(orderInformations?.orderDate)
                        .subtract(3, "hour")
                        .format("DD/MM/YYYY HH:mm")}
                    </p>
                    <p>
                      O seu pedido está registrado e pronto para tentar o
                      pagamento novamente quando você estiver pronto!
                    </p>
                  </CardDescription>
                </div>
                <Badge className="bg-red-600 hover:bg-red-700">Erro</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
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
                              <p className="text-xs text-muted-foreground">
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

          <div className="mb-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">
                      Tentar pagar novamente
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Por que não tentar pagar mais uma vez?
                    </p>
                    <Button
                      disabled={isRetryingPayment}
                      onClick={handleRetryPayment}
                      size="lg"
                      className="w-full cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Pagar novamente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-green-600" />
                Precisa de ajuda?
              </CardTitle>
              <CardDescription>
                Soluções comuns e opções de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Por que meu pagamento falhou?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Falha no pagamento pode ocorrer por diferentes motivos:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Saldo insuficiente na sua conta</li>
                      <li>Cartão expirou ou foi cancelado</li>
                      <li>
                        Informações de pagamento incorretas (CVC, Data de
                        expiração)
                      </li>
                      <li>A operadora do cartão recusou a transação</li>
                      <li>Problemas de internet ou conexão</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    O valor do pedido foi descontado do cartão?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Não, se você está vendo essa página de erro significa que
                      o seu pedido foi registrado mas o pagamento não foi
                      processado e, consequentemente, nenhum desconto em seu
                      cartão. Você pode facilmente tentar pagar novamente.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    O que devo fazer em seguida?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>
                        1. Verifique se suas informações de pagamento estão
                        corretas
                      </p>
                      <p>
                        2. Verifique se existe saldo suficiente em seu cartão
                      </p>
                      <p>
                        3. Entre em contato com seu banco se o problema
                        persistir
                      </p>
                      <p>5. Entre em contato conosco se precisar de ajuda</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    O meu pedido ainda está disponível para ser pago?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Sim! Se você ainda tiver interesse em comprar o produto, o
                      seu pedido ainda estará disponível para ser pago, mas por
                      tempo limitado. Após certo período, o mesmo será cancelado
                      automaticamente.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ainda precisa de ajuda?</CardTitle>
              <CardDescription>
                Nossa equipe de suporte está aqui para ajudar você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Email para contato
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Normalmente respondemos em menos de 24 horas
                    </p>
                    <a
                      href="mailto:suporte@nowaste.com"
                      className="text-sm text-green-600 hover:text-green-700 font-semibold"
                    >
                      suporte@nowaste.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      Telefone para contato
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Segunda - Sexta, 9:00 - 18:00
                    </p>
                    <a
                      href="tel:+21999999999"
                      className="text-sm text-green-600 hover:text-green-700 font-semibold"
                    >
                      (21) 99999-9999
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Número de referência:</span>{" "}
                  {orderId}
                  <br />
                  <span className="text-xs text-muted-foreground">
                    Por favor, inclua este número quando contactar o suporte
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Deseja continuar as compras enquanto procura uma solução?
            </p>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/products">Procurar mais ofertas</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
