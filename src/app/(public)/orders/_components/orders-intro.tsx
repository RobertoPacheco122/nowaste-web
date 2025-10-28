"use client";

export const OrdersIntro = () => {
  return (
    <section className="py-6 bg-gray-50 mb-4">
      <div className="container m-auto px-4 md:px-6 max-w-5xl">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Meus pedidos
            </h1>
            <p className="text-gray-500 mt-2">
              Visualize e gerencie o seu histórico de pedidos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
