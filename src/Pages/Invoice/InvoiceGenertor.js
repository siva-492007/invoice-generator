import React, {useEffect, useState} from 'react';
import "./InvoiceGenerator.css";
import {Logo} from "../Logo/Logo";
import {
    AddIndex,
    UpdateItem,
    UpdateQuantity,
    UpdateRate,
    UpdateTotalPrice
} from "../../Store/Action/InventoryTableActions"
import {useDispatch, useSelector} from "react-redux";

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

    const [rowArray, setRowArray] = useState([1])
    const [inventoryRowCount, setInventoryRowCount] = useState(1)

    const [addDiscount, setAddDiscount] = useState(false)
    const [addShipping, setAddShipping] = useState(false)

    const id_ = useSelector(state => state.inventoryTable.id)
    console.log(id_)


    let object = {
        id: 1,
        item: null,
        quantity: null,
        rate: null,
        totalPrice: null
    }

    let inventoryValues = new Array(rowArray.length)

    if(inventoryRowCount === 1){
        inventoryValues.push(object)
    }

    let updatedArray = new Array(rowArray.length)

    const IncrementInventoryRowCount = () => {
        setInventoryRowCount(prevState => prevState + 1)
        setRowArray(arr => [...arr, (inventoryRowCount)+1] )

        object.id = (inventoryRowCount)+1
        inventoryValues.push(object)
        console.log(inventoryValues)

    }

    const DecrementInventoryRowcount = () => {
        rowArray.pop()
        inventoryValues.pop()
        setInventoryRowCount(prevState => prevState - 1)
    }

    const dispatch = useDispatch();
    const addId = (id) => dispatch(AddIndex(id))

    const inventoryItem = useSelector(state => state.inventoryTable.item)
    const inventoryQuantity = useSelector(state => state.inventoryTable.quantity)
    const inventoryRate = useSelector(state => state.inventoryTable.rate)
    const inventoryTotalPrice = useSelector(state => state.inventoryTable.totalPrice)

    const handleUpdateItem = (item) => dispatch(UpdateItem(item))
    const handleUpdateQuantity = (quantity) => dispatch(UpdateQuantity(Number(quantity)))
    const handleUpdateRate = (rate) => dispatch(UpdateRate(Number(rate)))
    const handleUpdateTotalPrice = () => dispatch(UpdateTotalPrice())




    const UpdateInventoryItem = (index, item) => {
        updatedArray = inventoryValues.map((obj, pos) => {
            if(obj.id === index){
                obj.item = item
            }
            return obj
        })
    }
    const UpdateInventoryQuantity = (index, quantity) => {
        updatedArray = inventoryValues.map((obj, pos) => {
            if(obj.id === index){
                obj.quantity = quantity
            }
            return obj
        })
    }
    const UpdateInventoryRate = (index, rate) => {
        inventoryValues[index] = {
            rate: rate
        }
    }
    const UpdateInventoryTotalPrice = (index, totalPrice) => {
        inventoryValues[index] = {
            totalPrice: totalPrice
        }
    }


    return(
        <div>
            <header>
                <h1>Invoice</h1>
                <div className="features">
                    <button className="download_btn" onClick={()=> window.print()}>Download Invoice</button> <br/>
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
                <table className="inventory" id="inventory">
                    <thead>
                    <tr>
                        <th width="50%">Item</th>
                        <th>Quantity</th>
                        <th>Rate ({currency})</th>
                        <th>Price ({currency})</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{console.log(id_)}*/}
                    {
                        rowArray.map((item, index) => (
                                <tr>
                                    <td><input id={item+index} type="text" placeholder="Item Description"
                                               value={inventoryItem}
                                               onChange={(event => {
                                                   UpdateInventoryItem(index, event.target.value)
                                                   handleUpdateItem(event.target.value)
                                               })}/></td>
                                    <td><input id={item+index} type="number" placeholder="No of Items"
                                               value={inventoryQuantity}
                                               onChange={(event => {
                                                   UpdateInventoryQuantity(index, event.target.value)
                                                   handleUpdateQuantity(event.target.value)
                                                   handleUpdateTotalPrice()//inventoryQuantity * inventoryRate)
                                               })}/></td>
                                    <td><input id={item+index} type="number" placeholder="Amount per Item"
                                               value={inventoryRate}
                                               onChange={(event => {
                                                   UpdateInventoryRate(index, event.target.value)
                                                   handleUpdateRate(event.target.value)
                                                   handleUpdateTotalPrice()//Number(inventoryQuantity)*Number(inventoryRate))
                                               })}/></td>
                                    <td><input id={item+index} type="number" placeholder="Total Amount"
                                               value={inventoryTotalPrice} disabled={true}
                                               onChange={(event => {
                                                   // UpdateInventoryTotalPrice(index, event.target.value)
                                               })}/></td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
                <a className="cut" onClick={DecrementInventoryRowcount}>-</a>
                <a className="add" onClick={() => {
                                        IncrementInventoryRowCount()
                                        }
                                    } > +
                </a>
                {/*<table className="balance">*/}
                {/*    <tr>*/}
                {/*        <th>Total</th>*/}
                {/*        <td><span data-prefix>$</span><span>600.00</span></td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <th>Amount Paid</th>*/}
                {/*        <td><span data-prefix>$</span><span contentEditable>0.00</span></td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <th>Balance Due</th>*/}
                {/*        <td><span data-prefix>$</span><span>600.00</span></td>*/}
                {/*    </tr>*/}
                {/*</table>*/}
            </article>
            <aside>
                <div className="additional">
                    <p>Notes</p>
                    <textarea id="notes"  placeholder="Notes - Any information not already covered" /> <br/>
                    <p>Terms</p>
                    <textarea id="terms"  placeholder="Terms and Conditions - late fee, payment methods, delivery schedule"/>
                </div>


                <div className="bill">
                    <div className="bill_details"><p>Sub Total</p> <strong>{currency} {0}</strong> </div> <br/>
                    <div className="bill_details"><p>Tax in <b>%</b></p> <input type="number" name="tax" required={true}/></div> <br/>
                    <div className="bill_details">

                        { addDiscount && <><p>Discount in <b>%</b></p> <input type="number" name="discount" required={true}/><br/></>}
                        { (addDiscount && addShipping) && <br/>}
                        { addShipping && <><p>Shipping - <strong>{currency}</strong></p> <input type="number" name="shipping" required={true}/><br/> </>}

                        { (addDiscount || addShipping) && <br/>}

                        { !addShipping && <i className="shipping" onClick={()=> setAddShipping(true)}><b>+</b> Shipping</i>}
                        { !addDiscount && <i className="discount" onClick={()=> setAddDiscount(true)}> <b>+</b> Discount</i>}

                    </div>
                    { (!addDiscount || !addShipping) && <br/> }
                    <div className="bill_details"><p>Total</p> <strong>{currency} {0}</strong></div> <br/>
                    <div className="bill_details"><p>Paid - <strong>{currency}</strong> </p><input type="number" name="bill" required={true} /> </div><br/>
                    <div className="bill_details"><p>Balance Due</p> <strong>{currency} {0}</strong> </div>
                </div>
            </aside>

            <button className="submit" onChange={()=>console.log("submitted")}>Submit</button>
        </div>
    )
}

