"use client";

import React from "react";

import {
  BriefcaseBusiness,
  Building2,
  Home,
  MapPin,
  Pencil,
  Pin,
  SearchX,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddressesIntro } from "./_components/addresses-intro";
import { useUserAddresses } from "@/hooks/use-user-addresses";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteAddress } from "./_hooks/use-delete-address";
import { Spinner } from "@/components/ui/spinner";

export default function Addresses() {
  const [selectedAddressIdToDelete, setSelectedAddressIdToDelete] =
    React.useState("");
  const [isDeleteAddressDialogOpen, setIsDeleteAddressDialogOpen] =
    React.useState(false);

  const { data: addresses, isLoading } = useUserAddresses();

  const { deleteAddressMutation, isPending } = useDeleteAddress();

  const handleOpenAddressDialog = (addressId: string) => {
    setSelectedAddressIdToDelete(addressId);
    setIsDeleteAddressDialogOpen(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddressMutation({ id: addressId });

      setIsDeleteAddressDialogOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  console.log("addresses", addresses);

  return (
    <React.Fragment>
      <Dialog
        open={isDeleteAddressDialogOpen}
        onOpenChange={setIsDeleteAddressDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir endereço</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja{" "}
              <span className="text-destructive uppercase font-semibold">
                excluir
              </span>{" "}
              esse endereço? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsDeleteAddressDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => handleDeleteAddress(selectedAddressIdToDelete)}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : <Trash2 />} Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <main className="min-h-screen">
        <AddressesIntro />
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <Card className="p-0 mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    Por que salvar seus endereços?
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Os endereços nos ajudam a encontrar as melhores ofertas e
                    estabelecimentos próximos a você dispostos a atender sua
                    região. Sem eles, a Nowaste não consegueria fornecer os
                    serviços.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isLoading && addresses?.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <SearchX className="h-16 w-16" />
              <h3 className="text-xl font-semibold mb-2">
                Produtos não encontrados
              </h3>
              <p className="text-gray-400">
                Não encontramos ofertas para os filtos aplicados/endereço. Tente
                reajustá-los!
              </p>
            </div>
          )}

          {addresses && addresses.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {addresses.map(
                ({
                  id,
                  addressType,
                  city,
                  neighborhood,
                  complement,
                  number,
                  state,
                  streetName,
                  zipCode,
                  isDeleted,
                }) => {
                  if (isDeleted) return null;

                  return (
                    <Card
                      key={id}
                      className={"relative hover:shadow-lg transition-shadow"}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={"p-2 rounded-lg bg-gray-100"}>
                              {addressType === 1 && <Home size={18} />}
                              {addressType === 2 && (
                                <BriefcaseBusiness size={18} />
                              )}
                              {addressType === 3 && <Building2 size={18} />}
                              {addressType === 4 && <Pin size={18} />}
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {addressType === 1 && "Casa"}
                                {addressType === 2 && "Trabalho"}
                                {addressType === 4 && "Comum"}
                              </CardTitle>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleOpenAddressDialog(id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          <address className="not-italic">
                            <span className="block">
                              {streetName}, {number} - {neighborhood}
                            </span>
                            {complement && (
                              <span className="block">{complement}</span>
                            )}
                            <span>
                              {city}, {state} - {zipCode}
                            </span>
                          </address>
                          <br />
                        </CardDescription>
                        <div className="flex gap-2 flex-col">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="bg-transparent"
                          >
                            <Link href={`/addresses/${id}/edit`}>
                              <Pencil className="h-3 w-3 mr-1" />
                              Editar
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              )}
            </div>
          )}
        </div>
      </main>
    </React.Fragment>
  );
}
