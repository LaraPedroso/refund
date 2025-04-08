import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const singUpSchema = z
    .object({
        name: z.string().trim().min(1, { message: "Informe o nome" }),
        email: z
            .string({ message: "Informe o e-mail" })
            .email({ message: "E-mail inválido" }),
        password: z
            .string()
            .min(6, { message: "Senha deve ter pelo menos 6 digitos" }),
        passwordConfirm: z.string({ message: "Confirme a senha" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "As senhas não corresponde",
        path: ["passwordConfirm"],
    });

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = singUpSchema.parse({
                name,
                email,
                password,
                passwordConfirm,
            });

            await api.post("/users", data);

            if (
                confirm("Cadastro realizado com sucesso! Deseja fazer login?")
            ) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);

            // erro do zod
            if (error instanceof ZodError) {
                return alert(error.issues[0].message);
            }

            // erro da api
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message);
            }

            alert("Não foi possível cadastrar!");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <Input
                required
                legend="Nome"
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                required
                legend="Senha"
                type="password"
                placeholder="****"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                required
                legend="Confime sua senha"
                type="password"
                placeholder="****"
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <Button type="submit" isLoading={isLoading}>
                Entrar
            </Button>
            <a
                href="/"
                className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
            >
                Já tenho uma conta
            </a>
        </form>
    );
}
