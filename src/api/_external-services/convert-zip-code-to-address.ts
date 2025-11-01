import axios from "axios";

interface ConvertZipCodeToAddressParams {
  zipCode: string;
}

interface ConvertZipCodeToAddressResponse {
  cep: string;
  address_type: string;
  address_name: string;
  address: string;
  state: string;
  district: string;
  lat: string;
  lng: string;
  city: string;
}

export const convertZipCodeToAddress = async ({
  zipCode,
}: ConvertZipCodeToAddressParams) => {
  const token = process.env.NEXT_PUBLIC_AWESOME_API_TOKEN;

  const { data, status } = await axios.get<ConvertZipCodeToAddressResponse>(
    `https://cep.awesomeapi.com.br/json/${zipCode}?token=${token}`
  );

  return {
    data,
    status,
  };
};
