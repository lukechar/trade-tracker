// Material UI Components
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export const NewTrade = (props) => {

    const addTrade = (event) => {

        event.preventDefault();

        const openDate = event.target.opendate.value;
        const expiration = event.target.expiration.value;
        const ticker = event.target.ticker.value;
        const type = event.target.type.value;
        const strikes = event.target.strikes.value;
        const openPrice = event.target.openprice.value;
        const quantity = event.target.quantity.value;

        // TODO: validate form
        
        console.log(openDate);
        console.log(openPrice);
        console.log(expiration);
        console.log(ticker);
        console.log(type);
        console.log(strikes);
        console.log(openPrice);
        console.log(quantity);

    }

    return (
        <div className="container">
                <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />} 
                onClick={() => props.setAction(null)}
                >
                Back
            </Button>
            <form onSubmit={ addTrade }>
                <div className="field">
                    <label className="label">Open Date</label>
                    <div className="control">
                        <input name="opendate" className="input" type="text" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Expiration</label>
                    <div className="control">
                        <input name="expiration" className="input" type="text" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Ticker</label>
                    <div className="control">
                        <input name="ticker" className="input" type="text" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Strategy</label>
                    <div className="control">
                        <div className="select">
                        <select name="type">
                            <option>Long Call</option>
                            <option>Long Put</option>
                            <option>Short Call</option>
                            <option>Short Put</option>
                            <option>Bull Put Spread</option>
                            <option>Bear Put Spread</option>
                            <option>Bull Call Spread</option>
                            <option>Bear Call Spread</option>
                            <option>Short Iron Condor</option>
                            <option>Long Iron Condor</option>
                        </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Strike(s)</label>
                    <div className="control">
                        <input name="strikes" className="input" type="text" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Open Price</label>
                    <div className="control">
                        <input name="openprice" className="input" type="text" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Quantity</label>
                    <div className="control">
                        <input name="quantity" className="input" type="text" />
                    </div>
                </div>

                <div className="new-trade-controls">
                    <Button variant="contained" type="submit" color="primary">Add Trade</Button>
                </div>
            </form>
        </div>
    );
}

export default NewTrade;