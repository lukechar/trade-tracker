import { useCollectionData } from 'react-firebase-hooks/firestore';

// Material UI components

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';

const Trades = ({ uid, db }) => {

      // Attempt to fetch trades from Firestore
    const tradesQuery = db.collection(`/trades/${uid}/userTrades`).orderBy('openDate');
    const [userTrades, loadingUserTrades, errorLoadingUserTrades] = useCollectionData(tradesQuery);

    // console.log('trades: ', userTrades);  // debug

    if (loadingUserTrades) {
        return (
            <div className="trades">
                <p>Loading trades...</p>
            </div>
        );
    }
    else if (errorLoadingUserTrades) {
        return (
            <div className="trades">
                <p>Error loading trades.</p>
            </div>
        );
    }
    else {
        return (
            <>
                <div className="trades">
                    { userTrades.length ? 
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Open Date</th>
                                    <th>Close Date</th>
                                    <th>Expiration</th>
                                    <th>Ticker</th>
                                    <th>Type</th>
                                    <th>Strikes</th>
                                    <th>Open Price</th>
                                    <th>Close Price</th>
                                    <th>Profit/Loss</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { userTrades.map( (trade, i) => <TradeItem key={i} tradeData={trade} /> ) }
                            </tbody>
                        </table>
                        :
                        <p>No trades yet.</p> 
                    }
                </div>
                <div className="trade-controls">
                    <Button variant="contained" color="primary" onClick={() => { addTrade(db, uid) }} className="add-trade-button">Add New Trade</Button>
                </div>
            </>
        );
    }
}

const TradeItem = ({ tradeData }) => {

    const isClosed = ('closeDate' in tradeData);

    const openDate = tradeData.openDate.toDate().toLocaleDateString("en-US");
    const expirationDate = tradeData.expirationDate.toDate().toLocaleDateString("en-US");
    let closeDate = undefined;

    if (isClosed) {
        closeDate = tradeData.closeDate.toDate().toLocaleDateString("en-US");
    }

    return (
        <tr className="trade-item">
            <td>{ openDate }</td>
            <td>{ isClosed && closeDate }</td>
            <td>{ expirationDate }</td>
            <td>{ tradeData.ticker }</td>
            <td>{ tradeData.type }</td>
            <td>{ tradeData.strikes.join('/') }</td>
            <td>{ tradeData.openPrice}</td>
            <td>{ isClosed && tradeData.closePrice}</td>
            <td>{ isClosed && tradeData.profit }</td>
            <td>
                <CreateIcon className="has-tooltip-top has-tooltip-info" data-tooltip="Edit Trade" alt="Edit trade" onClick={ () => editTrade() } />
                { !isClosed && 
                    <CheckIcon data-tooltip="Close Trade" alt="Close trade" onClick={ () => closeTrade() } />
                }
            </td>
        </tr>
    );
}

const AddTradeDialog = () => {
    return (
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
        </div>
    );
}

const addTrade = (db, uid) => {
    const openDate = new Date("01/05/2021");
    const closeDate = new Date("01/11/2021");
    const expirationDate = new Date("01/15/2021");
    const ticker = 'SPY';
    const type = 'Short Naked Put'
    const strikes = [35];
    const openPrice = 2.07;
    const closePrice = 1.05;
    const profit = 1.02;
    // ... other data about trade from completed form goes here
    const tradeDocToAdd = {
        openDate,
        closeDate,
        expirationDate,
        ticker,
        type,
        strikes,
        openPrice,
        closePrice,
        profit
    };
    db.collection(`/trades/${uid}/userTrades`).doc().set(tradeDocToAdd)
    .then(console.log('New trade data added successfully.'));
}

const closeTrade = (props) => {}  // TODO

const editTrade = (props) => {}  // TODO

export default Trades;