import { useCollectionData } from 'react-firebase-hooks/firestore';

// Material UI components

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';

export const Trades = ({ uid, db, setAction, setSelectedTradeId }) => {

      // Attempt to fetch trades from Firestore
    const tradesQuery = db.collection(`/trades/${uid}/userTrades`).orderBy('openDate');
    const [userTrades, loadingUserTrades, errorLoadingUserTrades] = useCollectionData(tradesQuery);

    return (
        <div className="trades">
        { 
            loadingUserTrades ? 
                <p>Loading trades...</p> 
            : errorLoadingUserTrades ? 
                <p>Unable to load trades.</p>
            :
                <>
                    { 
                        userTrades.length ? 
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
                                    { userTrades.map( (trade, i) => <TradeItem key={i} tradeData={trade} setAction={setAction} /> ) }
                                </tbody>
                            </table>
                        :
                            <p>No trades yet.</p> 
                    }
                        <div className="trade-controls">
                            <Button variant="contained" color="primary" onClick={() => { setAction('new') }} className="add-trade-button">Add New Trade</Button>
                        </div>
                </>
        }
        </div>
        );
    }

const TradeItem = ({ tradeData, setAction }) => {

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
                <span className="trade-icon edit-trade-icon" title="Edit Trade">
                    <CreateIcon onClick={ () => setAction('edit') } />
                </span>
                { !isClosed && 
                    <span className="trade-icon close-trade-icon" title="Close Trade">
                        <CheckIcon onClick={ () => setAction('edit') } />
                    </span>
                }
            </td>
        </tr>
    );
}

export const AddTradeDialog = () => {
    return (
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <input className="input" type="text" placeholder="Text input" />
            </div>
        </div>
    );
}

// const addTrade = (db, uid) => {
//     const openDate = new Date("01/05/2021");
//     const closeDate = new Date("01/11/2021");
//     const expirationDate = new Date("01/15/2021");
//     const ticker = 'SPY';
//     const type = 'Short Naked Put'
//     const strikes = [35];
//     const openPrice = 2.07;
//     const closePrice = 1.05;
//     const profit = 1.02;

//     // Add trade form


//     // ... other data about trade from completed form goes here
//     const tradeDocToAdd = {
//         openDate,
//         closeDate,
//         expirationDate,
//         ticker,
//         type,
//         strikes,
//         openPrice,
//         closePrice,
//         profit
//     };
//     db.collection(`/trades/${uid}/userTrades`).doc().set(tradeDocToAdd)
//     .then(console.log('New trade data added successfully.'));
// }

// const closeTrade = (props) => {}  // TODO

// const editTrade = (props) => {}  // TODO

export default Trades;