import { MapPin, ShoppingCart, Sprout } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="bg-gradient-to-br from-green-50 to-green-100 grow px-8 py-12 lg:px-16 flex flex-col items-start justify-center">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Bem-vindo de volta a <span className="text-green-600">Nowaste</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Continue sua jornada para reduzir o desperdício de alimentos e
            economizar dinheiro. Acesse ofertas exclusivas de fornecedores
            locais e ajude a construir uma comunidade mais sustentável.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <ShoppingCart />
              </div>
              Acesse suas ofertas salvas e favoritas
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <MapPin />
              </div>
              Obtenha recomendações personalizadas perto de você
            </li>
            <li className="flex items-center gap-2">
              <div className="flex p-2 h-8 w-8 items-center justify-center rounded-full bg-green-200">
                <Sprout />
              </div>
              Acompanhe o seu impacto ambiental
            </li>
          </ul>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
