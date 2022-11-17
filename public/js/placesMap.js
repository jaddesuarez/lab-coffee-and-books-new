let myMap

function init() {
    renderMap()
    getPlaces()
    getLocation()
}


function getPlaces() {

    axios
        .get('/api/places')
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}

function getLocation() {

    navigator.geolocation.getCurrentPosition(
        position => placeMap(position),
        error => console.log('ERROR', error)
    )
}

function placeMap({ coords }) {

    const { latitude: lat, longitude: lng } = coords
    myMap.setCenter({ lat, lng })

    new google.maps.Marker({
        position: { lat, lng },
        map: myMap
    })
}

function setMarkers(places) {

    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        new google.maps.Marker({
            map: myMap,
            position: { lat, lng },
            title: elm.name
        })
    })
}

function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#myMap'),
        {
            zoom: 16,
            center: { lat: 40.461092, lng: - 3.708907 },
            styles: mapStyles.aubergine
        }
    )
}