import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().trim().min(1, { message: "Informe a senha" }),
});

export function SignIn() {
    // useActionData é um hook que retorna o estado atual da ação
    // formAction dispara a ação quando o formulário é enviado ( action={formAction} ==> async function signIn(_: any, formData: FormData))
    // state é o estado atual da ação
    const [state, formAction, isLoading] = useActionState(signIn, null);

    const { save } = useAuth();

    // formData é um objeto que contém os dados do formulário
    async function signIn(_: any, formData: FormData) {
        // formData.get - recupera o conteúdo pelo nome sem utilizar estados ( useState )
        try {
            const data = signInSchema.parse({
                email: formData.get("email"),
                password: formData.get("password"),
            });

            const response = await api.post("/sessions", data);
            save(response.data);
        } catch (error) {
            console.log(error);

            if (error instanceof ZodError) {
                return { message: error.issues[0].message };
            }

            if (error instanceof AxiosError) {
                return { message: error.response?.data.message };
            }

            return { message: "Erro ao fazer login" };
        }
    }
    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                required
                name="email"
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
            />
            <Input
                required
                name="password"
                legend="Senha"
                type="password"
                placeholder="****"
            />
            {state?.message && (
                <span className="text-red-500 text-sm text-center my-4 font-medium">
                    {state.message}
                </span>
            )}
            <Button type="submit" isLoading={isLoading}>
                Entrar
            </Button>
            <a
                href="/signup"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
            >
                Criar conta
            </a>
        </form>
    );
}
