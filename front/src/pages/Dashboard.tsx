import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import searchSvg from "../assets/search.svg";
import { RefundItem, RefundItemProps } from "../components/RefundItem";
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";
import { Pagination } from "../components/Pagination";
import { useAuth } from "../hooks/useAuth";

const refundItems = {
    id: "1",
    username: "Reembolso Restaurante",
    category: "Almoço em viagem",
    value: formatCurrency(34.5),
    categoryImg: CATEGORIES["transport"].icon,
};

export function Dashboard() {
    const [name, setName] = useState("");
    const [page, setPage] = useState(1);
    const [totalOfPage, setTotalOfPage] = useState(10);
    const [refunds, setRefunds] = useState<RefundItemProps[]>([refundItems]);

    const context = useAuth();
    context.session?.user.role;

    function fetchRefunds(e: React.FormEvent) {
        e.preventDefault();
        console.log(name);
    }

    function handlePagination(action: "next" | "previous") {
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalOfPage) {
                return prevPage + 1;
            }

            if (action === "previous" && prevPage > 1) {
                return prevPage - 1;
            }

            return prevPage;
        });
    }
    return (
        <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
            <h1 className="text-gray-100 font-bold text-xl flex-1">
                Solicitações
            </h1>

            <form
                className="flex flex-1 items-center justify-between pb-6 border-b-[1px] 
            border-b-gray-400 md:flex-row gap-2 mt-6"
                onSubmit={fetchRefunds}
            >
                <Input
                    placeholder="Pesquisa pelo nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button variant="icon" type="submit">
                    <img
                        src={searchSvg}
                        alt="Icone de pesquisar"
                        className="w-5"
                    />
                </Button>
            </form>
            <div className="my-6 flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
                {refunds.map((item) => (
                    <RefundItem
                        key={item.id}
                        data={item}
                        href={`/refund/${item.id}`}
                    />
                ))}
            </div>

            <Pagination
                current={page}
                total={totalOfPage}
                onNext={() => handlePagination("next")}
                onPrevious={() => handlePagination("previous")}
            />
        </div>
    );
}
