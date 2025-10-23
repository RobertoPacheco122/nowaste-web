"use client";

import React from "react";

import { SearchX, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Product } from "@/components/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressToDeliver } from "./address-to-deliver";
import { useSelectedAddress } from "../_hooks/use-selected-address";
import { useAllAvailableEstablishmentsForAddress } from "@/hooks/use-all-available-establishments-for-address";
import { useProductsAppliedFilters } from "../_hooks/use-products-applied-filters";
import { useUserCart } from "@/hooks/use-user-cart";

export const ProductsGrid = () => {
  const { appliedFilters } = useProductsAppliedFilters();
  const { selectedAddressId } = useSelectedAddress();
  const { handleAddItem } = useUserCart();

  const { data } = useAllAvailableEstablishmentsForAddress({
    addressId: selectedAddressId || "",
  });

  const products = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.flatMap(
      ({
        establishment: {
          exhibitionName,
          serviceRadiusInMeters,
          averageRating,
          distanceInMetersFromAddressToEstablishment,
        },
        products,
      }) => {
        const establishmentProducts = products.map((product) => ({
          ...product,
          image: <span className="text-4xl">🍕</span>,
          establishment: {
            exhibitionName,
            serviceRadiusInMeters,
            averageRating,
            distanceInMetersFromAddressToEstablishment,
          },
        }));

        return establishmentProducts;
      }
    );
  }, [data]);

  const filteredProducts = React.useMemo(() => {
    if (products.length === 0) return [];
    if (!appliedFilters) return products;

    return products.filter(
      ({
        name,
        actualPriceHistory: { salePrice },
        productCategory: { id },
        establishment: {
          averageRating,
          distanceInMetersFromAddressToEstablishment,
        },
      }) => {
        if (
          appliedFilters.productName &&
          !name.toLowerCase().includes(appliedFilters.productName.toLowerCase())
        )
          return false;

        if (
          appliedFilters.categories &&
          appliedFilters.categories.length > 0 &&
          !appliedFilters.categories.find((category) => category.id === id)
        )
          return false;

        if (
          appliedFilters.priceMax &&
          salePrice > appliedFilters.priceMax * 100
        )
          return false;

        if (
          appliedFilters.distanceMax &&
          distanceInMetersFromAddressToEstablishment >
            appliedFilters.distanceMax * 1000
        )
          return false;

        if (
          appliedFilters.ratings &&
          appliedFilters.ratings.length > 0 &&
          !appliedFilters.ratings.find(
            (rating) => rating === Math.floor(averageRating)
          )
        )
          return false;

        return true;
      }
    );
  }, [products, appliedFilters]);

  return (
    <div className="flex-1">
      <AddressToDeliver />
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} produto(s) encontrado(s)
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Ordernar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Menor para o maior preço</SelectItem>
            <SelectItem value="price-high">Maior para o menor preço</SelectItem>
            <SelectItem value="discount">Maior desconto</SelectItem>
            <SelectItem value="distance">Proximidade ao endereço</SelectItem>
            <SelectItem value="rating">Melhores avaliados</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center gap-2">
          <SearchX className="h-16 w-16" />
          <h3 className="text-xl font-semibold mb-2">
            Produtos não encontrados
          </h3>
          <p className="text-gray-400">
            Não encontramos ofertas para os filtos aplicados/endereço. Tente
            reajustá-los!
          </p>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(
          ({
            id,
            image,
            name,
            actualPriceHistory: { price, salePrice, showDiscountAsPercentage },
            establishment: {
              exhibitionName,
              distanceInMetersFromAddressToEstablishment,
              averageRating,
            },
          }) => {
            const salePriceInReais = salePrice / 100;
            const discountPriceInReais = (salePrice - price) / 100;
            const dicountInPercentage = showDiscountAsPercentage
              ? Math.round((1 - salePrice / price) * 100)
              : 0;
            const hasProductAnyDiscount = dicountInPercentage > 0;

            const formattedSalePriceInBrl = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "BRL",
            }).format(salePriceInReais);
            const formattedDiscountPriceInBrl = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "BRL",
            }).format(discountPriceInReais);
            const formattedDiscountInPercentage = `${dicountInPercentage}% OFF`;

            const formattedEstablishmentDistanceToAddressInKilometers = (
              distanceInMetersFromAddressToEstablishment / 1000
            ).toFixed(1);

            return (
              <Product key={id}>
                <Link href={`products/${id}`} className="relative">
                  <Product.Image>{image}</Product.Image>
                  {hasProductAnyDiscount && (
                    <Product.DiscountBadge className="absolute top-2 right-2">
                      {showDiscountAsPercentage
                        ? formattedDiscountInPercentage
                        : formattedDiscountPriceInBrl}
                    </Product.DiscountBadge>
                  )}
                </Link>
                <Product.Header>
                  <div className="flex justify-between">
                    <Link href={`product/${id}`}>
                      <Product.Title className="line-clamp-1 hover:text-green-600 transition-colors cursor-pointer">
                        {name}
                      </Product.Title>
                    </Link>
                    <Product.Rating>{averageRating}</Product.Rating>
                  </div>
                  <Product.SellerLocation>
                    {exhibitionName} -{" "}
                    {formattedEstablishmentDistanceToAddressInKilometers}km
                  </Product.SellerLocation>
                </Product.Header>
                <Product.Content>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Product.Price>{formattedSalePriceInBrl}</Product.Price>
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
    </div>
  );
};
