import { useEffect, useState } from "react";
import IDataList from "../model/IDatalist";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sum, setSum] = useState<number | null>();
  const [rahulspent, setRahulspent] = useState<number>(0);
  const [rameshspent, setRameshspent] = useState<number>(0);
  const [showform, setShowForm] = useState<boolean>(false);

  let rahulspent1: number = 0;
  let rameshspent1: number = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
     
        const data = await getDataFromServer();
        setItems(data);
        setSum(data.reduce((result, v) => (result = result + v.price), 0));
        Shares(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchMenu();
  }, [showform]);

  const Shares = (data: IDataList[]) => {
    data.map((x) =>
  
      x.payeeName === "Rahul"
        ? (rahulspent1 = rahulspent1 + x.price)
        : (rameshspent1 = rameshspent1 + x.price)
    );
    setRahulspent(rahulspent1);
    setRameshspent(rameshspent1);
    rahulspent1=0
    rameshspent1=0
  };

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.setDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulspent}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshspent}</span> <br />
      <span className="use-inline payable">
        {rahulspent > rameshspent ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulspent - rameshspent) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default ShowData;