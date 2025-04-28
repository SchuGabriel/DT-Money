import { Pagination, Stack } from "@mui/material";
import { useTransactions } from "../../hooks/useTransactions";
import { PaginationContent } from "./styles";

export function CustomPagination() {
  const { maxPage, currentPage, setCurrentPage } = useTransactions();

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaginationContent>
      <Stack spacing={2}>
        <Pagination
          count={maxPage}
          variant="outlined"
          onChange={handlePageChange}
          page={currentPage}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              borderColor: "#00B37E",
              "&.Mui-selected": {
                backgroundColor: "#00B37E",
                color: "#fff",
              },
            },
          }}
        />
      </Stack>
    </PaginationContent>
  );
}
