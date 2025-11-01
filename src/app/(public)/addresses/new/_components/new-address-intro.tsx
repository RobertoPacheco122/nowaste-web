import React from "react";

export const NewAddressIntro = () => {
  return (
    <section className="py-6 bg-gray-50 mb-4">
      <div className="container m-auto px-4 md:px-6 max-w-2xl">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Adicionar novo endereço
            </h1>
            <p className="text-gray-500 mt-2">
              Preencha os dados do endereço de entrega
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
