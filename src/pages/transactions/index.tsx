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

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });
  
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TableWrapper>
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
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
      </TransactionsContainer>
    </div>
  );
}
