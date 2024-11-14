import { useState } from "react";
import toast from "react-hot-toast";
import Cards from "react-credit-cards-2";
import CurrencyInput from "react-currency-input-field";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format_currency";
import { RootState } from "../../redux/store";
import DrawerBottom from "./drawer_security";

interface WithdrawProps {
  cardId: string | null;
  currency: string | null;
  balance: number;
}

export default function Withdraw({ cardId, currency, balance }: WithdrawProps) {
  const [amount, setAmount] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const cardData = useSelector(
    (state: RootState) => state.cards.cardState.cards
  );

  const handleAmountChange = (value: string | undefined) => {
    if (currency === "VND") {
      const numericValue = value
        ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
        : 0;
      if (numericValue % 1 !== 0) {
        toast.error("Số tiền rút bằng VND phải là số chẵn!");
        return;
      }
    }
    setAmount(value || "");
  };

  const selectedCard = cardData.find((card) => card._id === cardId);
  const MIN_WITHDRAW = currency === "USD" ? 10 : 10000;
  const MAX_WITHDRAW = currency === "USD" ? 1000 : 10000000;

  const handleConfirmWithdraw = () => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));

    if (numericAmount < MIN_WITHDRAW) {
      toast.error(`Số tiền rút tối thiểu là ${MIN_WITHDRAW.toLocaleString()}!`);
      return;
    }

    if (numericAmount > MAX_WITHDRAW) {
      toast.error(`Số tiền rút tối đa là ${MAX_WITHDRAW.toLocaleString()}!`);
      return;
    }
    if (currency === "VND" && numericAmount % 100 !== 0) {
      toast.error("Số tiền rút phải là số chẵn!");
      return;
    }

    if (selectedCard) {
      setDrawerOpen(true);
    } else {
      toast.error("Không tìm thấy thẻ!");
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold w-full text-center">Rút tiền</h2>

      <div className="mt-4">
        {selectedCard ? (
          <div className="flex justify-center mb-4">
            <Cards
              number={selectedCard.number}
              expiry={`${selectedCard.expiryMonth}/${selectedCard.expiryYear}`}
              cvc={selectedCard.cvv}
              name={selectedCard.name}
            />
          </div>
        ) : (
          <div className="text-red-500 text-center">Không tìm thấy thẻ!</div>
        )}

        <div className="mb-4">
          <span className="font-semibold">Tiền tệ: </span>
          {currency}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Số dư: </span>
          {balance ? formatCurrency(balance, currency) : 0}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="amount" className="font-semibold block mb-2">
          Số tiền:
        </label>
        <CurrencyInput
          name="amount"
          placeholder="Nhập số tiền"
          value={amount}
          decimalsLimit={2}
          onValueChange={handleAmountChange}
          className="border p-2 rounded w-full focus:border-blue-500"
          intlConfig={{ locale: "vi-VN", currency: currency || "VND" }}
        />
      </div>

      <div className={`w-full text-center`}>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={!amount}
          onClick={handleConfirmWithdraw}
        >
          Xác nhận rút tiền
        </button>
      </div>

      <DrawerBottom
        onClose={() => setDrawerOpen(false)}
        state={drawerOpen}
        data={{
          currency: currency!,
          cardID: cardId!,
          security_code: "",
          amount: amount!,
          isDeposit: false,
        }}
      />
    </div>
  );
}
