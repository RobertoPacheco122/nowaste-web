import Link from "next/link";

import {
  ArrowRight,
  DollarSign,
  Leaf,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/components/product";

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
];

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <HowItWorks />
      <FeaturedDeals />
      <ForVendors />
      <CallToAction />
    </main>
  );
}

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-white py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container m-auto text-center space-y-4 px-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Transforme o desperdício em
            <span className="text-green-600"> Bons Negócios</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Descubra comida perfeitamente boa a preços incríveis. Ajude a
            reduzir o desperdício enquanto economiza dinheiro em produtos
            frescos, refeições e mantimentos que, de outra forma, seriam jogados
            fora.
          </p>
        </div>
        <div className="space-x-2">
          <Button asChild size="lg">
            <Link href="/products">
              Começar a comprar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#vendors">Torne-se um vendedor</Link>
          </Button>
        </div>
        <div className="flex justify-center items-center space-x-8 text-sm text-gray-500 pt-8">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>10,000+ Clientes satisfeitos</span>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4" />
            <span>50 Toneladas de alimentos salvos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container m-auto px-4">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Reduza o desperdício</h3>
              <p className="text-gray-500">
                Ajude a evitar que alimentos em perfeito estado acabem em
                aterros sanitários. Cada compra faz a diferença.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Economize dinheiro</h3>
              <p className="text-gray-500">
                Compre produtos frescos, refeições e mantimentos com até 70% de
                desconto sobre os preços normais.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
              <Users className="h-10 w-10 text-purple-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Ajude sua comunidade</h3>
              <p className="text-gray-500">
                Auxilie vendedores, restaurantes e agricultores locais a
                recuperar custos enquanto constroem uma comunidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container m-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Como a <span className="text-green-600">Nowaste</span> Funciona
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Passos simples para economizar dinheiro e reduzir o desperdício
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span className="text-xl font-bold">1</span>
              </div>
              <CardTitle>Procure ofertas</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Descubra alimentos com desconto de fornecedores, restaurantes e
                agricultores locais. Filtre por local, categoria e horário de
                retirada.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <span className="text-xl font-bold">2</span>
              </div>
              <CardTitle>Encomende e pague</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Selecione seus itens, escolha retirada ou entrega e pague com
                segurança através da nossa plataforma. Receba confirmação
                instantânea.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="text-xl font-bold">3</span>
              </div>
              <CardTitle>Aproveite e economize</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription>
                Retire seu pedido ou peça para entrega. Desfrute de ótima comida
                a preços incríveis e acessíveis e ajude o meio ambiente.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const FeaturedDeals = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container m-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ofertas em destaque de hoje
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descobertas frescas a preços imbatíveis
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Product.Price>{formattedPriceInBrl}</Product.Price>
                        <Product.OldPrice>
                          {formattedOldPriceInBrl}
                        </Product.OldPrice>
                      </div>
                      <Product.Expiration>2h</Product.Expiration>
                    </div>
                  </Product.Content>
                </Product>
              );
            }
          )}
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/products">
              Ver todas ofertas <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

const ForVendors = () => {
  return (
    <section id="vendors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container m-auto px-4">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Para vendedores e restaurantes
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transforme seu excedente de alimentos em receita em vez de
                desperdício. Junte-se a milhares de vendedores que já usam o
                Nowaste.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>Recupere até 80% dos custos com alimentação</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>Dashboard fácil de usar</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>Opções flexíveis de coleta e entrega</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-green-600" />
                <span>
                  Crie fidelidade do cliente e reconhecimento da marca
                </span>
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">Comece a vender hoje</Button>
              <Button variant="outline" size="lg">
                Saiba mais
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Confeitaria da Maria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    &quot;A Nowaste nos ajudou a reduzir o desperdício em 90% e
                    a ganhar R$ 5,000 extras por mês com doces do dia
                    anterior&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mercearia Verde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    &quot;Em vez de jogar fora produtos imperfeitos, agora os
                    vendemos a preços excelentes. Ganha-ganha!&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
              Pronto para fazer a diferença?
            </h2>
            <p className="max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Junte-se ao movimento para reduzir o desperdício de alimentos e
              economizar dinheiro. Comece a comprar ou vender hoje mesmo.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/products">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Comece a comprar
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/products">Torne-se um vendedor</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
