"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { ItemsCart } from "./items-cart";

export function Header() {
  return (
    <header className="bg-background border-b-1">
      <div className="container m-auto flex items-center justify-between px-4 py-3">
        <div>
          <Link className="flex items-center" href="/">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-2xl font-bold text-green-600">
              Nowaste
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <AccountMenu />
          <ItemsCart />
        </div>
      </div>
    </header>
  );
}
