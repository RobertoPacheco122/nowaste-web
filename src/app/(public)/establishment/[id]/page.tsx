"use client";

import React from "react";

import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import {
  Star,
  MapPin,
  Leaf,
  Calendar,
  TrendingUp,
  Package,
  ShoppingCart,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetEstablishmentById } from "@/hooks/use-get-establishment-by-id";
import { useGetAllProductsByEstablishment } from "@/hooks/use-get-all-products-by-establishment";
import { calculateProductPriceInformations } from "@/utils/product/calculate-product-price-informations";
import { Product } from "@/components/product";
import { useUserCart } from "@/hooks/use-user-cart";
import { useGetAllEstablishmentsReviews } from "@/hooks/use-get-all-establishments-reviews";
import { useGetEstablishmentStats } from "@/hooks/use-get-establishment-stats";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

const images = ["🥕", "🥬", "🥒", "🍅"];

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

export default function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const { handleAddItem } = useUserCart();
  const { data: establishmentInformations } = useGetEstablishmentById({ id });
  const { data: products } = useGetAllProductsByEstablishment({
    establishmentId: id,
  });
  const { data: reviews } = useGetAllEstablishmentsReviews({ id });
  const { data: establishmentStats } = useGetEstablishmentStats({ id });

  return (
    <main className="min-h-screen">
      <section>
        <div className="h-48 bg-gradient-to-r from-green-100 to-green-200 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="container m-auto px-4 md:px-6 -mt-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarFallback className="text-2xl">
                {establishmentInformations?.exhibitionName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 w-full bg-white rounded-lg p-6 shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {establishmentInformations?.exhibitionName}
                  </h1>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(
                        establishmentInformations?.averageRating || 0
                      )}
                      <span className="font-semibold ml-1">
                        ({establishmentInformations?.averageRating})
                      </span>
                      <span className="text-muted-foreground">
                        • {establishmentInformations?.totalReviews} avaliações
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {establishmentInformations?.operationalAddress.city}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Membro desde{" "}
                        {dayjs(establishmentInformations?.createdAt).year()}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    {establishmentInformations?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto py-6 px-4">
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{products?.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Produtos ativos
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {establishmentStats?.sales}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total de vendas
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {(establishmentStats?.reducedWasteInGrams || 1) / 1000}kg
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Desperdício reduzido
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">
                  Produtos ({products?.length})
                </TabsTrigger>
                <TabsTrigger value="about">Sobre a empresa</TabsTrigger>
                <TabsTrigger value="reviews">
                  Avaliações ({establishmentInformations?.totalReviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-2xl font-bold">Produtos disponíveis</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products?.map(
                    (
                      {
                        id,
                        name,
                        actualPriceHistory: {
                          price,
                          salePrice,
                          showDiscountAsPercentage,
                        },
                      },
                      index
                    ) => {
                      const {
                        dicountInPercentage,
                        formattedDiscountPriceInBrl,
                        formattedSalePriceInBrl,
                      } = calculateProductPriceInformations(price, salePrice);

                      const hasProductAnyDiscount = salePrice < price;

                      return (
                        <Product key={id}>
                          <Link href={`/products/${id}`} className="relative">
                            <Product.Image>
                              {images[index] || images[0]}
                            </Product.Image>
                            {hasProductAnyDiscount && (
                              <Product.DiscountBadge className="absolute top-2 right-2">
                                {showDiscountAsPercentage
                                  ? `${dicountInPercentage}%`
                                  : formattedDiscountPriceInBrl}
                              </Product.DiscountBadge>
                            )}
                          </Link>
                          <Product.Header>
                            <div className="flex justify-between">
                              <Link href={`products/${id}`}>
                                <Product.Title className="line-clamp-1 hover:text-green-600 transition-colors cursor-pointer">
                                  {name}
                                </Product.Title>
                              </Link>
                              <Product.Rating>
                                {establishmentInformations?.averageRating}
                              </Product.Rating>
                            </div>
                            <Product.SellerLocation>
                              <Link
                                className="hover:underline hover:text-green-600"
                                href={`/establishment/${id}`}
                              >
                                {establishmentInformations?.exhibitionName}
                              </Link>
                            </Product.SellerLocation>
                          </Product.Header>
                          <Product.Content>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <Product.Price>
                                  {formattedSalePriceInBrl}
                                </Product.Price>
                              </div>
                            </div>
                            <Product.AddToCartButton
                              onClick={() => handleAddItem(id)}
                              className="w-full cursor-pointer"
                            >
                              <ShoppingCart /> Adicionar ao carrinho
                            </Product.AddToCartButton>
                          </Product.Content>
                        </Product>
                      );
                    }
                  )}
                </div>

                {products?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      Não foram encontrados produtos disponíveis.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="about" className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Sobre {establishmentInformations?.exhibitionName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {establishmentInformations?.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Horário de funcionamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {establishmentInformations?.operatingDays.map(
                          ({ dayOfWeek, closingTime, openingTime, id }) => (
                            <div key={id} className="flex justify-between">
                              <span className="capitalize font-semibold">
                                {dayOfWeek === 0
                                  ? "Domingo"
                                  : dayOfWeek === 1
                                  ? "Segunda-feira"
                                  : dayOfWeek === 2
                                  ? "Terça-feira"
                                  : dayOfWeek === 3
                                  ? "Quarta-feira"
                                  : dayOfWeek === 4
                                  ? "Quinta-feira"
                                  : dayOfWeek === 5
                                  ? "Sexta-feira"
                                  : "Sábado"}
                              </span>
                              <span className="text-muted-foreground">
                                {openingTime} - {closingTime}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Avaliações dos compradores
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(
                        establishmentInformations?.averageRating || 0
                      )}
                    </div>
                    <span className="font-semibold">
                      {establishmentInformations?.averageRating}
                    </span>
                    <span className="text-muted-foreground">
                      ({establishmentInformations?.totalReviews} avaliações)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews?.map(
                    ({
                      reviewDate,
                      rating,
                      id,
                      personComment,
                      person: { fullName },
                    }) => {
                      const reviewDateFormatted = dayjs(reviewDate);

                      return (
                        <Card key={id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {fullName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <h4 className="font-semibold">
                                      {fullName}
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                      <div className="flex items-center space-x-1">
                                        {renderStars(rating)}
                                      </div>
                                      <span className="text-sm text-muted-foreground">
                                        {reviewDateFormatted.fromNow()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-muted-foreground">
                                  {personComment}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    }
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </main>
  );
}
