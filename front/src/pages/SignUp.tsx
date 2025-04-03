import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    function onSubmit(e: React.FormEvent){
        e.preventDefault()
        console.log(name, email, password, passwordConfirm )

    }
    return (
        <form 
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-4"
        >
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
            <Button type="submit" isLoading={isLoading}>Entrar</Button>
            <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">Já tenho uma conta</a>
        </form>
    )
}