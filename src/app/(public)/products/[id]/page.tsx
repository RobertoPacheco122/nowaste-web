"use client";

import React from "react";

import { Handshake, MapPin, ShoppingCart, Star, Store } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProductById } from "@/hooks/use-get-product-by-id";
import { calculateProductPriceInformations } from "@/utils/product/calculate-product-price-informations";
import { useGetAllProductsByEstablishment } from "@/hooks/use-get-all-products-by-establishment";
import { Product as ProductCard } from "@/components/product";
import { useUserCart } from "@/hooks/use-user-cart";

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

const images = ["🥕", "🥬", "🥒", "🍅"];

export default function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const { id } = React.use(params);

  const { handleAddItem } = useUserCart();
  const { data: product } = useGetProductById({ id });
  const { data: similarProducts } = useGetAllProductsByEstablishment({
    establishmentId: product?.establishment.id || "",
  });

  const productPriceInformations = React.useMemo(() => {
    if (!product) return;

    const priceInformations = calculateProductPriceInformations(
      product.actualPriceHistory.price,
      product.actualPriceHistory.salePrice,
      quantity
    );

    return priceInformations;
  }, [product, quantity]);

  const similarProductsToRender = React.useMemo(() => {
    if (!product || !similarProducts || similarProducts.length === 0) return [];

    return similarProducts
      .filter(
        (similarProduct) =>
          similarProduct.id !== product.id && similarProduct.isActive
      )
      .slice(0, 3);
  }, [similarProducts, product]);

  const hasProductAnyDiscount =
    product &&
    product.actualPriceHistory.salePrice < product.actualPriceHistory.price;

  const establishmentAddress = product?.establishment.operationalAddress;

  return (
    <main>
      <div>
        <section className="py-8">
          <div className="container mx-auto py-6 px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-8xl">{images[selectedImage]}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 transition-colors ${
                        selectedImage === index
                          ? "border-green-600"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <span className="text-2xl">{image}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold">{product?.name}</h1>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(
                        !product ? 0 : product.establishment.averageRating
                      )}
                      <span className="ml-1">
                        ({product?.establishment.averageRating})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-green-600">
                      {productPriceInformations?.formattedSalePriceInBrl}
                    </span>
                    {hasProductAnyDiscount && (
                      <React.Fragment>
                        <span className="text-xl text-gray-500 line-through">
                          {
                            productPriceInformations?.formattedOriginalPriceInBrl
                          }
                        </span>
                        <Badge className="bg-red-500 hover:bg-red-600">
                          {product.actualPriceHistory.showDiscountAsPercentage
                            ? `${productPriceInformations?.dicountInPercentage}%`
                            : productPriceInformations?.formattedDiscountPriceInBrl}
                        </Badge>
                      </React.Fragment>
                    )}
                  </div>
                  {hasProductAnyDiscount && (
                    <p className="text-sm text-gray-600">
                      Você economiza
                      {productPriceInformations?.formattedDiscountPriceInBrl}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-600">{product?.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="font-medium">Quantidade:</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddItem(id, quantity)}
                    size="lg"
                    className="w-full cursor-pointer"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adicionar ao carrinho -{" "}
                    {productPriceInformations?.formattedSubtotalSalePriceInBrl}
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Informações do estabelecimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {product?.establishment.exhibitionName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link
                          href={`/establishment/${product?.establishment.id}`}
                          className="hover:text-green-600 transition-colors"
                        >
                          <h4 className="font-semibold">
                            {product?.establishment.exhibitionName}
                          </h4>
                        </Link>
                        <div className="flex items-center space-x-1">
                          {renderStars(
                            product?.establishment.averageRating || 0
                          )}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({product?.establishment.averageRating}) •{" "}
                            {product?.establishment.totalReviews} avaliações
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {establishmentAddress?.streetName},{" "}
                          {establishmentAddress?.number} -{" "}
                          {establishmentAddress?.neighborhood} -{" "}
                          {establishmentAddress?.city},{" "}
                          {establishmentAddress?.state}
                        </span>
                      </div>
                      <span className="text-muted-foreground flex gap-2 items-center">
                        <Handshake className="h-4 w-4" /> Membro desde{" "}
                        {product &&
                          dayjs(product.establishment.createdAt).year()}
                      </span>

                      <span className="text-muted-foreground">
                        {product?.establishment.description}
                      </span>
                    </div>
                    <div className="">
                      <Button
                        variant="outline"
                        asChild
                        className="bg-transparent w-full"
                      >
                        <Link
                          href={`/establishment/${product?.establishment.id}`}
                        >
                          <Store /> Ir para loja
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 bg-gray-50">
          <div className="container mx-auto py-6 px-4">
            <h2 className="text-2xl font-bold mb-6">Produtos similares</h2>
            {similarProductsToRender?.length === 0 ? (
              <p>Não existem produtos para exibição</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {similarProducts?.map(
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
                      <Link key={id} href={`/products/${id}`}>
                        <ProductCard key={id}>
                          <ProductCard.Image>{images[index]}</ProductCard.Image>
                          {hasProductAnyDiscount && (
                            <ProductCard.DiscountBadge className="absolute top-2 right-2">
                              {showDiscountAsPercentage
                                ? `${dicountInPercentage}%`
                                : formattedDiscountPriceInBrl}
                            </ProductCard.DiscountBadge>
                          )}

                          <ProductCard.Header>
                            <div className="flex justify-between">
                              <Link href={`products/${id}`}>
                                <ProductCard.Title className="line-clamp-1 hover:text-green-600 transition-colors cursor-pointer">
                                  {name}
                                </ProductCard.Title>
                              </Link>
                              <ProductCard.Rating>
                                {product?.establishment.averageRating}
                              </ProductCard.Rating>
                            </div>
                            <ProductCard.SellerLocation>
                              {product?.establishment.exhibitionName}
                            </ProductCard.SellerLocation>
                          </ProductCard.Header>
                          <ProductCard.Content>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-2">
                                <ProductCard.Price>
                                  {formattedSalePriceInBrl}
                                </ProductCard.Price>
                              </div>
                            </div>
                          </ProductCard.Content>
                        </ProductCard>
                      </Link>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
