"use client";

import React from "react";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Home,
  MapPin,
  Pin,
} from "lucide-react";

import { useUserAddresses } from "@/hooks/use-user-addresses";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelectedAddress } from "../_hooks/use-selected-address";

export const AddressToDeliver = () => {
  const [isAddressDialogOpen, setIsAddressDialogOpen] = React.useState(false);

  const { selectedAddressId, setSelectedAddressId } = useSelectedAddress();
  const { data: addresses } = useUserAddresses();

  React.useEffect(() => {
    if (!addresses || addresses.length === 0) return;

    const defaultAddress =
      addresses.find(({ addressType }) => addressType === 1) || addresses[0];

    setSelectedAddressId(defaultAddress.id);
  }, [addresses, setSelectedAddressId]);

  const handleAddressChange = React.useCallback(
    (addressId: string) => {
      setSelectedAddressId(addressId);
      setIsAddressDialogOpen(false);
    },
    [setSelectedAddressId]
  );

  const hasAnyAddresses = addresses && addresses?.length > 0;

  const selectedAddress = addresses?.find(({ id }) => id === selectedAddressId);

  return (
    <React.Fragment>
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escolha o endereço</DialogTitle>
            <DialogDescription>
              Selecione onde voce deseja receber os produtos e ver ofertas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!addresses || addresses.length === 0 ? (
              <p className="text-center font-semibold mb-6 text-muted-foreground text-sm">
                Nenhum endereço encontrado. Cadastre para prosseguir
              </p>
            ) : (
              <RadioGroup
                value={selectedAddressId}
                onValueChange={handleAddressChange}
              >
                {addresses?.map(
                  ({
                    addressType,
                    id,
                    streetName,
                    city,
                    state,
                    zipCode,
                    number,
                    neighborhood,
                    isDeleted,
                  }) => {
                    if (isDeleted) return null;

                    return (
                      <div
                        key={id}
                        className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <RadioGroupItem value={id} id={id} className="mt-1" />
                        <Label htmlFor={id} className="flex-1 cursor-pointer">
                          <div className="flex items-center space-x-2 mb-1">
                            {addressType === 1 && <Home size={18} />}
                            {addressType === 2 && (
                              <BriefcaseBusiness size={18} />
                            )}
                            {addressType === 3 && <Building2 size={18} />}
                            {addressType === 4 && <Pin size={18} />}
                          </div>
                          <div className="text-sm text-gray-600">
                            {streetName}, {number} - {neighborhood}
                            <br />
                            {city}, {state} {zipCode}
                          </div>
                        </Label>
                      </div>
                    );
                  }
                )}
              </RadioGroup>
            )}
            <Button asChild className="w-full" variant="default">
              <Link href="/addresses/new">
                <MapPin className="h-4 w-4" />
                Adicionar novo endereço
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mb-6">
        <Button
          onClick={() => setIsAddressDialogOpen(true)}
          className="bg-transparent  text-sm hover:bg-gray-50 px-5 py-6 rounded-lg transition-colors border border-gray-200 hover:border-green-600 cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900">
                {!hasAnyAddresses ? "Cadastre um endereço" : "Entregar em:"}
              </div>
              <div className="text-gray-500">
                {!hasAnyAddresses
                  ? "Para ver as ofertar próximas a você!"
                  : `${selectedAddress?.streetName}, ${selectedAddress?.number} - ${selectedAddress?.neighborhood}`}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </Button>
      </div>
    </React.Fragment>
  );
};
