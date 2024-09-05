import ItemTransaction from "../../components/history_transaction/item_transaction";
import USDTIcon from "../../assets/svg/usdt.svg";
import { getTransactionPaginate } from "../../services/api/transaction.api";
import { useQuery } from "@tanstack/react-query";

const RecentTransaction = () => {
  interface Transaction {
    id: string;
  }

  interface PaginatedResponse<T> {
    data: {
      transactions: T[];
      id: string;
    };
  }

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await getTransactionPaginate(1, 5);
      return response.data;
    },
    queryKey: ["recent-transaction"],
  });

  return (
    <div>
      {!isLoading
        ? data?.data.transactions?.map((item: any, key: any) => (
            <ItemTransaction
              item={item}
              userID={data.data.id}
              key={key}
              icon={USDTIcon}
            />
          ))
        : Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse py-1">
                <div className="flex justify-between items-center my-2 py-1 px-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                    <div className="ml-2">
                      <div className="bg-gray-300 h-4 w-40 mb-2 rounded"></div>
                      <div className="bg-gray-300 h-4 w-16 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-300 h-4 w-20 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
    </div>
  );
};

export default RecentTransaction;
