import React from "react";

export const CheckoutIntro = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container m-auto px-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Carrinho de compras
            </h1>
            <p className="text-gray-500 mt-2">
              Finalize sua compra e ajude a reduzir o desperdício
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
