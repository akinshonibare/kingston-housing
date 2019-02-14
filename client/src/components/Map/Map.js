import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	DirectionsRenderer
} from "react-google-maps";
import googleMapsStylings from "./googleMapStylings.js";

const Map = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?key=AIzaSyDsqSHrfGXsJxjEjpKTNP2IfYgYToNkp_o&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: (
			<div
				style={{
					height: `100%`
				}}
			/>
		),
		containerElement: (
			<div
				style={{
					height: `100%`
				}}
			/>
		),
		mapElement: (
			<div
				style={{
					height: `100%`
				}}
			/>
		),
		center: {
			lat: 44.22862,
			lng: -76.502105
		},
		zoom: 14
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const DirectionsService = new window.google.maps.DirectionsService();
			DirectionsService.route(
				{
					origin: new window.google.maps.LatLng(
						this.props.house.lat,
						this.props.house.lng
					),
					destination: new window.google.maps.LatLng(
						this.props.house.lat,
						this.props.house.lng
					),
					travelMode: window.google.maps.TravelMode.WALKING
				},
				(result, status) => {
					if (status === window.google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						});
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		},
		componentDidUpdate() {
			const DirectionsService = new window.google.maps.DirectionsService();
			DirectionsService.route(
				{
					origin: new window.google.maps.LatLng(
						this.props.house.lat,
						this.props.house.lng
					),
					destination: new window.google.maps.LatLng(
						this.props.destination.value.lat,
						this.props.destination.value.lng
					),
					travelMode: window.google.maps.TravelMode.WALKING
				},
				(result, status) => {
					if (status === window.google.maps.DirectionsStatus.OK) {
						this.setState({
							directions: result
						});
					} else {
						console.error(`error fetching directions ${result}`);
					}
				}
			);
		}
	})
)(props => (
	<div style={{ height: "100%", position: "relative" }}>
		<GoogleMap
			zoom={props.zoom}
			center={props.center}
			ref={props.zoomToMarkers}
			defaultOptions={{
				styles: googleMapsStylings,
				minZoom: 11,
				mapTypeControl: true,
				mapTypeControlOptions: {
					style: {},
					mapTypeIds: ["roadmap", "satellite"]
				}
			}}
		>
			{/* QUEEN'S MARKER */}
			{/* <Marker
				position={{
					lat: 44.227699,
					lng: -76.495277
				}}
				icon={{
					url: "https://img.icons8.com/color/48/000000/university.png"
				}}
			/> */}

			{/* {props.house.lat && props.house.lng && (
				<Marker
					position={{
						lat: props.house.lat,
						lng: props.house.lng
					}}
				/>
			)} */}

			{props.directions && (
				<DirectionsRenderer directions={props.directions} />
			)}
		</GoogleMap>
	</div>
));

export default Map;
