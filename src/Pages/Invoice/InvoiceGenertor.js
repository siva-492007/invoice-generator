import React, {useState} from 'react';
import "./InvoiceGenerator.css";
import {Logo} from "../Logo/Logo";

export const InvoiceGenerator = () => {

    const [invoice, setInvoice] = useState(null);
    const [date, setDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [paymentTerms, setPaymentTerms] = useState(null);
    const [poNum, setPoNum] = useState(null);
    const [fromAddress, setFromAddress] = useState(null);
    const [toAddress, setToAddress] = useState(null);
    const [shipAddress, setShipAddress] = useState(null);
    const [currency, setCurrency] = useState("INR")

    const CheckInputValues = () => {
        console.log(invoice)
        console.log(date)
        console.log(dueDate)
        console.log(paymentTerms)
        console.log(poNum)
        console.log(fromAddress)
        console.log(toAddress)
        console.log(shipAddress)
    }

    // const [] = useState(null);
    // const [] = useState(null);
    // const [] = useState(null);

    return(
        <div>
            <header>
                <h1>Invoice</h1>
                <div className="features">
                    <button onClick={()=> window.print()}>Download Invoice</button> <br/>
                    <div className="dropdown">
                        <button className="dropbtn">Currency: {currency}</button>
                        <div className="dropdown-content">
                            <p onClick={() => setCurrency("INR")}>INR</p>
                            <p onClick={() => setCurrency("USD")}>USD</p>
                            <p onClick={() => setCurrency("EUR  ")}>EUR</p>
                        </div>
                    </div>
                    {/*</select>*/}
                </div>
                <div className="logo">
                    <Logo />
                </div>
            </header>

            <article>
                <address >
                    <textarea
                        value={fromAddress} id="form-address" rows="2" cols="28" placeholder="From Address"
                        onChange={ (event)=> setFromAddress(event.target.value) }
                    />
                    <br />
                    <textarea
                        value={toAddress} id="to-address" rows="2"  cols="12" placeholder="To Address"
                        onChange={ (event)=> setToAddress(event.target.value) }
                    />
                    <textarea
                        value={shipAddress} id="ship-address" rows="2" cols="12" placeholder="Ship Address"
                        onChange={ (event)=> setShipAddress(event.target.value) }
                    />
                </address>
                <table className="meta">
                    <tr>
                        <th>INVOICE #</th>
                        <td>
                            <input value={invoice} type="number" placeholder="Invoice number"
                                   min="0"
                                   onChange={(event => setInvoice(event.target.value))}
                            />
                        </td>
                    </tr>
                    <br />
                    <br />
                    <tr>
                        <th>Date</th>
                        <td><input value={date} type="date" onChange={(event => setDate(event.target.value))}/></td>
                    </tr>
                    <tr>
                        <th>Payment Terms</th>
                        <td><input value={paymentTerms} type="text" placeholder="Payment Terms"
                                   onChange={(event => setPaymentTerms(event.target.value))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Due Date</th>
                        <td><input value={dueDate} type="date" onChange={(event => setDueDate(event.target.value))}/></td>
                    </tr>
                    <tr>
                        <th>PO Number</th>
                        <td><input value={poNum} type="number" placeholder="PO number"
                                   min="0"
                                   onChange={(event => setPoNum(event.target.value))}
                            />
                        </td>
                    </tr>
                </table>
                <table className="inventory">
                    <thead>
                    <tr>
                        <th width="50%">Item</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><a className="cut">-</a><input id="" placeholder=""/></td>
                        <td><input id="" placeholder=""/></td>
                        <td><input id="" placeholder=""/></td>
                        <td><span data-prefix></span><input id="" placeholder=""/></td>
                    </tr>
                    </tbody>
                </table>
                <a className="add">+</a>
                <table className="balance">
                    <tr>
                        <th>Total</th>
                        <td><span data-prefix>$</span><span>600.00</span></td>
                    </tr>
                    <tr>
                        <th>Amount Paid</th>
                        <td><span data-prefix>$</span><span contentEditable>0.00</span></td>
                    </tr>
                    <tr>
                        <th>Balance Due</th>
                        <td><span data-prefix>$</span><span>600.00</span></td>
                    </tr>
                </table>
            </article>
            <aside>
                <h1><span contentEditable>Additional Notes</span></h1>
                <div contentEditable>
                    <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
                </div>
            </aside>
        </div>
    )
}

