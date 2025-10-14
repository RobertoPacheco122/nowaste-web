"use client";

import { Product } from "@/components/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  SearchX,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const products = [
  {
    id: 1,
    image: <span className="text-4xl">🥕</span>,
    name: "Caixa de vegetais mistos",
    salePriceInCents: 899,
    originalPriceInCents: 1299,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Seu João",
      distanceToUserAddressInKm: 1.2,
    },
  },
  {
    id: 2,
    image: <span className="text-4xl">🍕</span>,
    name: "Pizza Margherita",
    salePriceInCents: 699,
    originalPriceInCents: 1499,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Pizzaria do Tony",
      distanceToUserAddressInKm: 1.2,
    },
  },
  {
    id: 3,
    image: <span className="text-4xl">🍎</span>,
    name: "Mistura de frutas frescas",
    salePriceInCents: 1599,
    originalPriceInCents: 1899,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Fazendinha do amor",
      distanceToUserAddressInKm: 1.2,
    },
  },
  {
    id: 4,
    image: <span className="text-4xl">🥕</span>,
    name: "Caixa de vegetais mistos",
    salePriceInCents: 899,
    originalPriceInCents: 1299,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Seu João",
      distanceToUserAddressInKm: 1.2,
    },
  },
  {
    id: 5,
    image: <span className="text-4xl">🍕</span>,
    name: "Pizza Margherita",
    salePriceInCents: 699,
    originalPriceInCents: 1499,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Pizzaria do Tony",
      distanceToUserAddressInKm: 1.2,
    },
  },
  {
    id: 6,
    image: <span className="text-4xl">🍎</span>,
    name: "Mistura de frutas frescas",
    salePriceInCents: 1599,
    originalPriceInCents: 1899,
    rating: 4.1,
    dicountInPercentage: 70,
    seller: {
      name: "Fazendinha do amor",
      distanceToUserAddressInKm: 1.2,
    },
  },
];

const filterCategories = [
  {
    id: "vegetables",
    label: "Vegetables",
    count: 1,
  },
  {
    id: "fruits",
    label: "Fruits",
    count: 2,
  },
  {
    id: "prepared",
    label: "Prepared Food",
    count: 3,
  },
  {
    id: "bakery",
    label: "Bakery",
    count: 4,
  },
];

export default function Products() {
  return (
    <div className="">
      <SearchDeals />
      <section>
        <div className="container m-auto py-6 px-4">
          <div className="flex gap-6">
            <Aside />
            <ProductsGrid />
          </div>
        </div>
      </section>
    </div>
  );
}

const SearchDeals = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  return (
    <section className="py-6 bg-gray-50 border-b">
      <div className="container m-auto px-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Food Deals
            </h1>
            <p className="text-gray-500 mt-2">
              Find great food and support local businesses
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for food, vendors..."
                className="pl-10"
              />
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect deals
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const Aside = () => {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky">
        <Card className="py-0">
          <CardContent className="p-6">
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

const ProductsGrid = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Showing 5 of {products.length} results for &quot;Salgadinhos&quot;
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expiry">Expires Soon</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="discount">Highest Discount</SelectItem>
            <SelectItem value="distance">Nearest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Badge
          variant="secondary"
          className="px-3 py-1 font-semibold flex items-center"
        >
          Search: &quot;Salgadinhos&quot;
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 cursor-pointer"
          >
            <div>
              <X className="h-3 w-3" />
            </div>
          </Button>
        </Badge>
        <Badge
          variant="secondary"
          className="px-3 py-1 font-semibold flex items-center"
        >
          Fruits
          <Button variant="ghost" size="sm" className="h-auto p-0 ">
            <div>
              <X className="h-3 w-3" />
            </div>
          </Button>
        </Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(
          ({
            id,
            image,
            name,
            originalPriceInCents,
            salePriceInCents,
            rating,
            dicountInPercentage,
            seller,
          }) => {
            const formattedPriceInBrl = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "BRL",
            }).format(salePriceInCents / 100);

            const formattedOldPriceInBrl = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "BRL",
            }).format(originalPriceInCents / 100);

            return (
              <Product key={id}>
                <Link href={`product/${id}`} className="relative">
                  <Product.Image>{image}</Product.Image>
                  <Product.DiscountBadge className="absolute top-2 right-2">
                    {dicountInPercentage}% OFF
                  </Product.DiscountBadge>
                </Link>
                <Product.Header>
                  <div className="flex justify-between">
                    <Link href={`product/${id}`}>
                      <Product.Title className="line-clamp-1 hover:text-green-600 transition-colors cursor-pointer">
                        {name}
                      </Product.Title>
                    </Link>
                    <Product.Rating>{rating}</Product.Rating>
                  </div>

                  <Product.SellerLocation>
                    {seller.name} - {seller.distanceToUserAddressInKm} km
                  </Product.SellerLocation>
                </Product.Header>
                <Product.Content>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Product.Price>{formattedPriceInBrl}</Product.Price>
                      <Product.OldPrice>
                        {formattedOldPriceInBrl}
                      </Product.OldPrice>
                    </div>
                    <Product.Expiration>2h</Product.Expiration>
                  </div>
                  <Product.AddToCartButton className="w-full">
                    <ShoppingCart /> Add to cart
                  </Product.AddToCartButton>
                </Product.Content>
              </Product>
            );
          }
        )}
      </div>

      <div className="text-center py-12">
        <div className="flex items-center justify-center">
          <SearchX className="h-16 w-16" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-gray-500 mb-4">
          Try adjusting your filters or search terms to find what you&apos;re
          looking for.
        </p>
        <Button variant="outline">Clear all filters</Button>
      </div>
    </div>
  );
};

const FilterContent = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700"
        >
          Clear all
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-semibold">Categories</h4>
        <div className="space-y-2">
          {filterCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label
                htmlFor={category.id}
                className="text-sm cursor-pointer flex-1"
              >
                {category.label}
              </Label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-semibold">Price Range</h4>
        <div className="px-2">
          <Slider value={[0]} max={50} min={0} step={1} className="w-full" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${0}</span>
            <span>${50}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Distance */}
      <div className="space-y-3">
        <h4 className="font-semibold">Maximum Distance</h4>
        <div className="px-2">
          <Slider
            value={[10]}
            max={10}
            min={0.5}
            step={0.5}
            className="w-full"
          />
          <div className="text-sm text-gray-500 mt-2">Within {10} miles</div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-semibold">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center space-x-1"
              >
                <div className="flex">{renderStars(rating || 5)}</div>
                <span>{rating === 0 ? "Any rating" : `${rating}+ stars`}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Special Filters */}
      <div className="space-y-3">
        <h4 className="font-semibold">Special Offers</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="expiring-soon" />
            <Label htmlFor="expiring-soon" className="text-sm cursor-pointer">
              Expiring soon (within 2 hours)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
