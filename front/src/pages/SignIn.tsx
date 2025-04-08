import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useActionData } from "react-router";

export function SignIn() {
    // useActionData é um hook que retorna o estado atual da ação
    // formAction dispara a ação quando o formulário é enviado ( action={formAction} ==> signIn)
    // state é o estado atual da ação
    const [state, formAction, isLoading] = useActionState(signIn, {
        email: "",
        password: "",
    });

    // formData é um objeto que contém os dados do formulário
    function signIn(prevState: any, formData: FormData) {
        // recupera o conteúdo pelo nome sem utilizar estados ( useState )
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(prevState);

        return { email, password };
    }
    return (
        <form action={formAction} className="w-full flex flex-col gap-4">
            <Input
                required
                name="email"
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                defaultValue={String(state?.email)}
            />
            <Input
                required
                name="password"
                legend="Senha"
                type="password"
                placeholder="****"
                defaultValue={String(state?.password)}
            />
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
