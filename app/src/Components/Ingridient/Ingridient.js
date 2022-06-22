import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap_white.css';
import "./ingridient.css";

export default function Ingridient (props) {

    let googleMapsUrl = 'http://www.google.com/maps/place/';

    function getLatitude(geoCoords) {
        return geoCoords.split(',')[0];
    }

    function getLongitude(geoCoords) {
        return geoCoords.split(',')[1];
    }

    function makeGoogleMapUrl(geoCoords) {
        const lat = getLatitude(geoCoords);
        const lng = getLongitude(geoCoords);

        return googleMapsUrl + lat + '/' + lng;
    }

    function buildPopover() {
        return (
            <Tooltip
                overlay={
                    <div>
                        <p className="special-title">{props.special.type}! {props.special.title}</p>
                        <hr />
                        {props.special.text}
                        {(props.special.geo &&
                        <div>
                            <a href={makeGoogleMapUrl(props.special.geo)} rel="noreferrer" target="_blank">directions</a>
                        </div>
                    )}
                    </div>
                }>
                <div className="has-popover">
                    {props.ingridient.amount} {props.ingridient.measurement}{props.ingridient.measurement ? ' ' : ''}{props.ingridient.name}
                </div>
            </Tooltip>);
    }

    return (
        <div key={props.index.toString()} className="ingridients-wrapper">
            {props.special === undefined
                ?
                    props.ingridient.amount + ' ' + props.ingridient.measurement + (props.ingridient.measurement ? ' ': '') + props.ingridient.name
                :
                    buildPopover()
            }
        </div>
    );
}