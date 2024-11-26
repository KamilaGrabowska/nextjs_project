import Link from "next/link";
import style from "./pagination.module.scss";

type PaginationProps = {
    page: number;
    total: number;
    perPage: number;
};

export const Pagination = ({page, total, perPage}: PaginationProps) => {
    const isNextPage = (page + 1) * perPage < total;

    return (
        <div className={style.pagination}>
            {page > 1 && <Link href={`/posts?page=${page - 1}`}>Previous</Link>}
            <div>page:{page}</div>
            {isNextPage && <Link href={`/posts?page=${page + 1}`}>Next</Link>}
        </div>
    );
};
