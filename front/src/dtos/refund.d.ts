type RefundAPIResponse = {
    id: string;
    userId: string;
    name: string;
    category: CategoriesAPIEnum;
    amount: number;
    filename: string;
    user: {
        name: string;
    };
};

type RefundsPaginationAPIResponse = {
    refunds: RefundAPIResponse[];
    pagination: {
        page: null;
        perPage: number;
        totalRecords: number;
        totalPages: number;
    };
};
