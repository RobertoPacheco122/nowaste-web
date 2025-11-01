import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { api } from "@/lib/axios";

import { AuthFormData } from "../page";
import { ApiErrorResponse, authenticate } from "@/api/auth/authenticate";
import { useLoggedUser } from "@/hooks/use-logged-user";
import { getLoggedUserInformations } from "@/utils/user/get-logged-user-informations";

export const AUTH_COOKIE_NAME = "nowaste_auth_token";

export const useSignInForm = () => {
  const { setLoggedUser } = useLoggedUser();

  const { isError, isPending, isSuccess, mutateAsync } = useMutation<
    Awaited<ReturnType<typeof authenticate>>,
    AxiosError<ApiErrorResponse>,
    AuthFormData
  >({
    mutationFn: authenticate,
    onSuccess: ({ data }) => {
      Cookies.set(AUTH_COOKIE_NAME, data.token, { expires: 1 });

      const userInformations = getLoggedUserInformations();

      setLoggedUser(userInformations);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    },
    onError: (error) => {
      if (error.status === 401) {
        toast.error(
          <span className="font-semibold">Erro ao autenticar-se</span>,
          {
            description: (
              <span className="text-muted-foreground">
                Email ou senha incorretos. Verifique as informações e tente
                novamente.
              </span>
            ),
          }
        );

        return;
      }

      toast.error(<span className="font-semibold">Erro de conexão</span>, {
        description: (
          <span className="text-muted-foreground">
            Não foi possível conectar ao servidor. Verifique sua conexão com a
            internet e tente novamente.
          </span>
        ),
      });
    },
  });

  return { isError, isPending, isSuccess, authenticateMutation: mutateAsync };
};
