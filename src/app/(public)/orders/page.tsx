"use client";

import React from "react";

import Link from "next/link";
import dayjs from "dayjs";
import {
  Leaf,
  ShoppingCart,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ChevronRight,
  MapPin,
  CookingPot,
} from "lucide-react";

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
import { OrdersIntro } from "./_components/orders-intro";
import { useGetAllOrdersByPerson } from "@/hooks/use-get-all-orders-by-person";
import { OrderStatus } from "@/api/order/register-order";

export default function OrdersPage() {
  const { data: ordersInformations } = useGetAllOrdersByPerson();

  const totalFoodImpactInKilograms = React.useMemo(() => {
    if (!ordersInformations) return 0;

    const deliveredOrders = ordersInformations.filter(
      ({ orderStatus }) => orderStatus === OrderStatus.delivered
    );

    if (deliveredOrders.length === 0) return 0;

    let total = 0;

    deliveredOrders.forEach(({ orderItems }) => {
      orderItems.forEach(({ product: { weightInGrams } }) => {
        total += weightInGrams;
      });
    });

    return total / 1000;
  }, [ordersInformations]);

  const totalOrderedItemsCount = React.useMemo(() => {
    if (!ordersInformations) return 0;

    const deliveredOrders = ordersInformations.filter(
      ({ orderStatus }) => orderStatus === OrderStatus.delivered
    );

    if (deliveredOrders.length === 0) return 0;

    let total = 0;

    deliveredOrders.forEach(({ orderItems }) => {
      orderItems.forEach(({ itemQuantity }) => {
        total += itemQuantity;
      });
    });

    return total;
  }, [ordersInformations]);

  return (
    <main className="min-h-screen">
      <OrdersIntro />
      <div className="py-6">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          {ordersInformations && ordersInformations?.length > 0 && (
            <Card className="border-green-200 bg-green-50 mb-8">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900">
                      Seu impacto no meio ambiente
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Você evitou que {totalOrderedItemsCount} itens fossem
                      jogados no lixo. Isso equivale a aproximadamente{" "}
                      {totalFoodImpactInKilograms}kg de alimentos
                      reaproveitados.
                    </p>
                    <p className="text-sm font-semibold text-green-700 mt-1">
                      Nós da Nowaste o agradecemos imensamente por nos ajudar em
                      nossa missão de reduzir o desperdício de alimentos!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!ordersInformations || ordersInformations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2">
                  Sem pedidos registrados
                </h3>
                <p className="text-muted-foreground mb-6 text-center max-w-sm">
                  Comece a comprar para ver seus pedidos.
                </p>
                <Button asChild size="lg">
                  <Link href="/products">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Ver produtos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {ordersInformations
                .sort((a, b) => dayjs(b.orderDate).diff(a.orderDate))
                .map(
                  ({
                    id,
                    orderStatus,
                    friendlyId,
                    establishment,
                    orderDate,
                    orderItems,
                    total,
                    deliveryAddress,
                  }) => {
                    const statusConfig = getStatusConfig(orderStatus);

                    const orderItemsCount = orderItems.reduce(
                      (acc, item) => acc + item.itemQuantity,
                      0
                    );

                    const formattedOrderTotalPriceInBrl = new Intl.NumberFormat(
                      "en-US",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    ).format(total / 100);

                    return (
                      <Card
                        key={id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-lg">
                                  Pedido #{friendlyId} -{" "}
                                  {establishment.exhibitionName}
                                </CardTitle>
                                <Badge className={statusConfig?.color}>
                                  {statusConfig?.icon}
                                  {statusConfig?.label}
                                </Badge>
                              </div>
                              <CardDescription>
                                {dayjs(orderDate)
                                  .subtract(3, "hour")
                                  .format("DD/MM/YYYY HH:mm")}{" "}
                                •{" "}
                                {orderItemsCount === 1
                                  ? `${orderItemsCount} item`
                                  : `${orderItemsCount} itens`}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {formattedOrderTotalPriceInBrl}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Total (com descontos e taxas)
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {orderStatus === OrderStatus.outForDelivery && (
                            <div className="bg-purple-50 p-4 rounded-lg flex items-start space-x-3">
                              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Truck className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm text-purple-900 mb-1">
                                  A caminho!
                                </h4>
                                <p className="text-sm text-purple-700">
                                  Estimativa de entrega: 30-60 minutos
                                </p>
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center">
                              <Package className="h-4 w-4 mr-2 text-green-600" />
                              Itens do pedido
                            </h4>
                            <div className="space-y-2">
                              {orderItems.map(
                                ({ productName, itemQuantity, total }) => {
                                  const formattedItemTotalPriceInBrl =
                                    new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "BRL",
                                    }).format(total / 100);

                                  return (
                                    <div
                                      key={productName}
                                      className="flex items-center space-x-3"
                                    >
                                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🥕</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">
                                          {productName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {establishment.exhibitionName}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-semibold">
                                          x{itemQuantity}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {formattedItemTotalPriceInBrl}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <Separator />

                          <div className="flex items-start space-x-3">
                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {deliveryAddress}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 sm:flex-none bg-transparent"
                              disabled={true}
                            >
                              Ver detalhes
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const getStatusConfig = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.pending:
      return {
        label: "Pagamento pendente",
        icon: <Clock className="h-3 w-3 mr-1" />,
        color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        iconColor: "text-yellow-600",
      };
    case OrderStatus.confirmed:
      return {
        label: "Pagamento confirmado",
        icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        iconColor: "text-blue-600",
      };
    case OrderStatus.preparing:
      return {
        label: "Preparando",
        icon: <CookingPot className="h-3 w-3 mr-1" />,
        color: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        iconColor: "text-purple-600",
      };
    case OrderStatus.outForDelivery:
      return {
        label: "Em rota de entrega",
        icon: <Truck className="h-3 w-3 mr-1" />,
        color: "bg-orange-100 text-orange-800 hover:bg-orange-200",
        iconColor: "text-orange-600",
      };
    case OrderStatus.delivered:
      return {
        label: "Entregue",
        icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
        color: "bg-green-100 text-green-800 hover:bg-green-200",
        iconColor: "text-green-600",
      };
    case OrderStatus.canceled:
      return {
        label: "Cancelado",
        icon: <XCircle className="h-3 w-3 mr-1" />,
        color: "bg-red-100 text-red-800 hover:bg-red-200",
        iconColor: "text-red-600",
      };
  }
};
