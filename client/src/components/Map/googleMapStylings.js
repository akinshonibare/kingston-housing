const googleMapsStylings = [
	{ mapTypeControl: false },
	{
		featureType: "administrative",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#444444"
			}
		]
	},
	{
		featureType: "landscape",
		elementType: "all",
		stylers: [
			{
				color: "#f2f2f2"
			}
		]
	},
	{
		featureType: "administrative.neighborhood",
		elementType: "labels",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "all",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "road",
		elementType: "all",
		stylers: [
			{
				saturation: -100
			},
			{
				lightness: 45
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "all",
		stylers: [
			{
				visibility: "simplified"
			}
		]
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#7fd8de"
			}
		]
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#70989c"
			}
		]
	},
	{
		featureType: "road.arterial",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "transit",
		elementType: "all",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "water",
		elementType: "all",
		stylers: [
			{
				color: "#53d8f0"
			},
			{
				visibility: "on"
			}
		]
	}
];

export default googleMapsStylings;
