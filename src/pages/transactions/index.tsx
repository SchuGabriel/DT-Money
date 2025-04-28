import { Header } from "../../components/header";
import { Summary } from "../../components/Summary";
import {
  PriceHighLight,
  TableWrapper,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";
import { SearchForm } from "./components/searchForm";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFromatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { CustomPagination } from "../../components/pagination";

export function Transactions() {
  const transactionsCurrentPage = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionsCurrentPage;
    }
  );

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TableWrapper>
          <TransactionsTable>
            <tbody>
              {transactionsCurrentPage.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.description}</td>
                    <td>
                      <PriceHighLight variant={transaction.type}>
                        {transaction.type === "outcome" && "- "}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFromatter.format(new Date(transaction.createAt))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TransactionsTable>
        </TableWrapper>
        <CustomPagination />
      </TransactionsContainer>
    </div>
  );
}
