import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-b-1">
      <div className="flex items-center justify-between px-4 py-6">
        <p className="text-xs text-muted-foreground">
          © 2025 Nowaste. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-2">
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Termos de serviço
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacidade
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
