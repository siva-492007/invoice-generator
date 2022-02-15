import React, { useState} from 'react';
import "./InvoiceGenerator.css";
import {Logo} from "../Logo/Logo";
import {
    AddRow,
    DeleteRow,
    UpdateItem,
    UpdateQuantity,
    UpdateRate
} from "../../Store/Action/InventoryTableActions"
import {useDispatch, useSelector} from "react-redux";

export const InvoiceGenerator = () => {

    const [invoiceVar, setInvoiceVar] = useState("INVOICE #")
    const [dateVar, setDateVar] = useState("Date")
    const [paymentTermsVar, setPaymentTermsVar] = useState("Payment Term")
    const [dueDateVar, setDueDateVar] = useState("Due Date")
    const [poNumVar, setPoNumVar] = useState("PO Number")
    const [itemVar, setItemVar] = useState("Item")
    const [quantityVar, setQuantityVar] = useState("Quantity")
    const [rateVar, setRateVar] = useState("Rate")
    const [totalPriceVar, setTotalPriceVar] = useState("Total")
    const [notesVar, setNotesVar] = useState("Notes")
    const [termsVar, setTermsVar] = useState("Terms")
    const [subTotalVar, setSubTotalVar] = useState("Sub Total")
    const [taxVar, setTaxVar] = useState("Tax ")
    const [discountVar, setDiscountVar] = useState("Discount ")
    const [shippingAmtVar, setShippingAmtVar] = useState("Shipping ")
    const [taxedTotalVar, setTaxedTotalVar] = useState("Total")
    const [paidVar, setPaidVar] = useState("Paid")
    const [balanceVar, setBalanceVar] = useState("Balance Due")


    const [invoice, setInvoice] = useState(0);
    const [date, setDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [paymentTerms, setPaymentTerms] = useState(null);
    const [poNum, setPoNum] = useState(0);
    const [fromAddress, setFromAddress] = useState(null);
    const [toAddress, setToAddress] = useState(null);
    const [shipAddress, setShipAddress] = useState(null);
    const [currency, setCurrency] = useState("INR")
    const [notes, setNotes] = useState(null)
    const [terms, setTerms] = useState(null)
    const [addDiscount, setAddDiscount] = useState(false)
    const [addShipping, setAddShipping] = useState(false)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [shippingAmt, setShippingAmt] = useState(0)
    const [paidAmt, setPaidAmt] = useState(0)

    const dispatch = useDispatch();

    const inventoryData = useSelector(state => state.inventoryTable.tableData)
    const subTotal = inventoryData.reduce((total, currentVal) => total = total + currentVal.totalPrice, 0)
    let taxedTotal = (subTotal*(1 + tax/100) - discount*(1 + discount/100) + shippingAmt).toFixed(2)
    let balanceDue = (taxedTotal - paidAmt).toFixed(2)

    const newRowObject = {
        id: inventoryData.length+1,
        item: null,
        quantity: null,
        rate: null,
        totalPrice: null
    }

    const handleAddRow = () => dispatch(AddRow(newRowObject))
    const handleDeleteRow = () => dispatch(DeleteRow())

    const handleUpdateItem = (index, item) => dispatch(UpdateItem(index, item))
    const handleUpdateQuantity = (index, quantity) => dispatch(UpdateQuantity(index, Number(quantity)))
    const handleUpdateRate = (index, rate) => dispatch(UpdateRate(index, Number(rate)))

    return(
        <div>
            <header>
                <h1>Invoice</h1>
                <div className="features">
                    <button type="button" className="download_btn" onClick={()=>window.print()}>Download Invoice</button> <br/>
                    <div className="dropdown">
                        <button className="dropbtn">Currency: {currency} </button>
                        <div className="dropdown-content">
                            <p onClick={() => setCurrency("INR")}>INR</p>
                            <p onClick={() => setCurrency("USD")}>USD</p>
                            <p onClick={() => setCurrency("EUR")}>EUR</p>
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
                        <th><input className="meta_th" value={invoiceVar} type="text" disabled={true}/></th>
                        <td>
                            <input type="number" placeholder="Invoice number"
                                   min="0"
                                   onChange={(event => setInvoice(event.target.value))}
                            />
                        </td>
                    </tr>
                    <br />
                    <br />
                    <tr>
                        <th><input className="meta_th" value={dateVar} type="text" onChange={(event)=>setDateVar(event.target.value)} /></th>
                        <td><input value={date} type="date" onChange={(event => setDate(event.target.value))}/></td>
                    </tr>
                    <tr>
                        <th><input className="meta_th" value={paymentTermsVar} type="text" onChange={(event)=>setPaymentTermsVar(event.target.value)} /></th>
                        <td><input type="text" placeholder="Payment Terms"
                                   onChange={(event => setPaymentTerms(event.target.value))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th><input className="meta_th" value={dueDateVar} type="text" onChange={(event)=>setDueDateVar(event.target.value)} /></th>
                        <td><input type="date" onChange={(event => setDueDate(event.target.value))}/></td>
                    </tr>
                    <tr>
                        <th><input className="meta_th" value={poNumVar} type="text" onChange={(event)=>setPoNumVar(event.target.value)} /></th>
                        <td><input type="number" placeholder="PO number"
                                   min="0"
                                   onChange={(event => setPoNum(Number(event.target.value)))}
                            />
                        </td>
                    </tr>
                </table>
                <table className="inventory" id="inventory">
                    <thead>
                    <tr>
                        <th width="50%"><input className="inventory_th" value={itemVar} type="text" onChange={(event => setItemVar(event.target.value))}/></th>
                        <th><input className="inventory_th" value={quantityVar} type="text" onChange={(event => setQuantityVar(event.target.value))}/></th>
                        <th><input className="inventory_th" value={rateVar} type="text" onChange={(event => setRateVar(event.target.value))}/></th>
                        <th><input className="inventory_th" value={totalPriceVar} type="text" onChange={(event => setTotalPriceVar(event.target.value))}/> </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        inventoryData.map((item, index) => (
                                <tr>
                                    <td><input id={item+index} type="text" placeholder="Item Description"
                                               onChange={(event => {
                                                   handleUpdateItem(index, event.target.value)
                                               })}/></td>
                                    <td><input id={item+index} type="number" placeholder="No of Items"
                                               onChange={(event => {
                                                   handleUpdateQuantity(index, event.target.value)
                                               })}/></td>
                                    <td><input id={item+index} type="number" placeholder="Amount per Item"
                                               onChange={(event => {
                                                   handleUpdateRate(index, event.target.value)
                                               })}/></td>
                                    <td><input className="totalPrice" id={item+index} type="text" placeholder="Total Amount"
                                               value={inventoryData[index].totalPrice} disabled={true} /></td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
                <a className="cut" onClick={()=>handleDeleteRow()}>-</a>
                <a className="add" onClick={() => {
                    handleAddRow()
                }} > + </a>

            </article>
            <aside>
                <div className="additional">
                    <input className="additional_input" type="text" value={notesVar} onChange={event => setNotesVar(event.target.value)}/>
                    <textarea id="notes"  placeholder="Notes - Any information not already covered" onChange={(event)=> setNotes(event.target.value)}/> <br/>
                    <input className="additional_input" type="text" value={termsVar} onChange={event => setTermsVar(event.target.value)}/>
                    <textarea id="terms"  placeholder="Terms and Conditions - late fee, payment methods, delivery schedule" onChange={(event)=> setTerms(event.target.value)}/>
                </div>

                <div className="bill">
                    <div className="bill_details"><input className="bill_var" value={subTotalVar} type="text" onChange={event => setSubTotalVar(event.target.value)}/> <strong>{currency} {subTotal}</strong> </div> <br/>
                    <div className="bill_details">
                        <input className="bill_var" value={taxVar} type="text" onChange={event => setTaxVar(event.target.value)}/>
                        <input className="bill_values" type="number" name="tax" required={true} onChange={(event)=>setTax(Number(event.target.value))}/>
                    </div> <br/>

                    <div className="bill_details">

                        { addDiscount && <>
                            <input className="bill_var" value={discountVar} type="text" onChange={event => setDiscountVar(event.target.value)}/>
                            <input className="bill_values" type="number" name="discount" required={true} onChange={(event) => setDiscount(Number(event.target.value))}/>
                            <br/>
                            </>
                        }
                        { (addDiscount && addShipping) && <br/>}
                        { addShipping && <>
                            <input className="bill_var" value={shippingAmtVar} type="text" onChange={event => setShippingAmtVar(event.target.value)}/>
                            <input className="bill_values"  type="number" name="shipping" required={true} onChange={(event)=> setShippingAmt(Number(event.target.value))}/>
                            <br/>
                            </>
                        }

                        { (addDiscount || addShipping) && <br/>}

                        { !addShipping && <i className="shipping" onClick={()=> setAddShipping(true)}><b>+</b> Shipping</i>}
                        { !addDiscount && <i className="discount" onClick={()=> setAddDiscount(true)}> <b>+</b> Discount</i>}

                    </div>
                    { (!addDiscount || !addShipping) && <br/> }
                    <div className="bill_details">
                        <input className="bill_var" value={taxedTotalVar} type="text"/>
                        <strong>{currency} {taxedTotal}</strong>
                    </div>
                    <br/>
                    <div className="bill_details">
                        <input className="bill_var" value={paidVar} type="text" onChange={event => setPaidVar(event.target.value)}/>
                        <input className="bill_values" type="number" name="bill" required={true} onChange={ (event) => setPaidAmt(Number(event.target.value))}/>
                    </div>
                    <br/>
                    <div className="bill_details">
                        <input className="bill_var" value={balanceVar} type="text" onChange={event => setBalanceVar(event.target.value)}/>
                        <strong>{currency} {balanceDue}</strong>
                    </div>
                </div>
            </aside>
            <br/>
            <button className="submit" onChange={()=>console.log("submitted")}>Submit</button>
        </div>
    )
}

