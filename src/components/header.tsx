"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { ItemsCart } from "./items-cart";

export function Header() {
  return (
    <header className="bg-background border-b-1">
      <div className="container m-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Link className="flex items-center mr-6" href="/">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-green-600">
              Nowaste
            </span>
          </Link>
          <nav>
            <ul>
              <li>
                <Link
                  className="text-sm font-semibold hover:underline underline-offset-4"
                  href="/products"
                >
                  Produtos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <AccountMenu />
          <ItemsCart />
        </div>
      </div>
    </header>
  );
}
