"use client";

import React from "react";

import { Search, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useAllProductCategories } from "@/hooks/use-all-product-categories";
import { Skeleton } from "@/components/ui/skeleton";
import z from "zod";
import { useProductsAppliedFilters } from "../_hooks/use-products-applied-filters";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAllAvailableEstablishmentsForAddress } from "@/hooks/use-all-available-establishments-for-address";
import { useSelectedAddress } from "../_hooks/use-selected-address";
import { Input } from "@/components/ui/input";

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-3 w-3 ${
        i < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : i < rating
          ? "fill-yellow-400/50 text-yellow-400"
          : "text-gray-300"
      }`}
    />
  ));
};

export const productsFiltersSchema = z.object({
  productName: z.string().optional(),
  categories: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .optional(),
  priceMax: z.number().optional(),
  distanceMax: z.number().optional(),
  ratings: z.array(z.number()).optional(),
});

export type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>;

export const ProductsFilters = () => {
  const { appliedFilters, setAppliedFilters } = useProductsAppliedFilters();
  const { selectedAddressId } = useSelectedAddress();

  const { data: availableEstablishments } =
    useAllAvailableEstablishmentsForAddress({
      addressId: selectedAddressId || "",
    });

  const { data: categories, isLoading: isLoadingCategories } =
    useAllProductCategories();

  const { control, reset, watch, register } = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(productsFiltersSchema),
    defaultValues: appliedFilters,
  });

  React.useEffect(() => {
    const subscription = watch((values) => {
      const parsedValues = productsFiltersSchema.parse(values);
      setAppliedFilters(parsedValues);
    });

    return () => subscription.unsubscribe();
  }, [watch, setAppliedFilters]);

  const hightestProductPriceInReais = React.useMemo(() => {
    if (!availableEstablishments || availableEstablishments.length === 0)
      return 0;

    return Math.max(
      ...availableEstablishments.flatMap((establishment) =>
        establishment.products.map(
          ({ actualPriceHistory: { salePrice } }) => salePrice / 100
        )
      )
    );
  }, [availableEstablishments]);

  const handleClearFilters = () => {
    reset({
      productName: "",
      categories: [],
      distanceMax: 10,
      priceMax: 0,
      ratings: [],
    });
  };

  return (
    <form className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700 cursor-pointer"
          onClick={handleClearFilters}
        >
          Limpar tudo
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-semibold">Nome do alimento</h4>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            {...register("productName")}
            placeholder="Ex.: Cenoura"
            className="pl-10"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-semibold">Categorias</h4>
        <div className="space-y-2">
          {isLoadingCategories &&
            Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-4 w-[50px]" />
            ))}

          {categories?.map(({ id, name }) => (
            <Controller
              key={id}
              name="categories"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={field.value?.some((cat) => cat.id === id)}
                    onCheckedChange={(checked) => {
                      const currentValues = field.value || [];

                      if (checked)
                        return field.onChange([...currentValues, { id, name }]);

                      return field.onChange(
                        currentValues.filter((category) => category.id !== id)
                      );
                    }}
                  />
                  <Label htmlFor={id} className="text-sm cursor-pointer flex-1">
                    {name}
                  </Label>
                </div>
              )}
            />
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4>
          <span className="font-semibold">Preço até: </span>
          R${appliedFilters.priceMax?.toFixed(2)}
        </h4>
        <Controller
          name="priceMax"
          control={control}
          render={({ field }) => (
            <div className="px-2">
              <Slider
                value={[field.value || 0]}
                onValueChange={(value) => field.onChange(value[0])}
                max={hightestProductPriceInReais + 1}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>R$0</span>
                <span>R${(hightestProductPriceInReais + 1).toFixed(2)}</span>
              </div>
            </div>
          )}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-semibold">Distância até o estabelecimento</h4>
        <Controller
          name="distanceMax"
          control={control}
          render={({ field }) => (
            <div className="px-2">
              <Slider
                value={[field.value || 10]}
                onValueChange={(value) => field.onChange(value[0])}
                max={10}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-2">
                Até {field.value || 10}km
              </div>
            </div>
          )}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="font-semibold">Avaliações</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <Controller
              key={rating}
              name="ratings"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={field.value?.includes(rating)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...(field.value || []), rating])
                        : field.onChange(
                            field.value?.filter((value) => value !== rating)
                          );
                    }}
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-sm cursor-pointer flex items-center space-x-1"
                  >
                    <div className="flex">{renderStars(rating)}</div>
                    <span>{`${rating} estrelas`}</span>
                  </Label>
                </div>
              )}
            />
          ))}
        </div>
      </div>

      <Separator />
    </form>
  );
};
