window.onload = () => {
    let method = 'dynamic';

    // if you want to statically add places, de-comment following line
    method = 'static';

    if (method === 'static') {
        // let places = staticLoadPlaces();
        // renderPlaces(places);

        getPlaces().then(function(data) {
            var places = [];
            for (let i = 0; i < data.length; i++) {
                var obj = {
                    id: parseInt(data[i].id),
                    name: "Place name",
                    location: {
                        lat: parseFloat(data[i].lat),
                        lng: parseFloat(data[i].lng)
                    }
                };
                places.push(obj);
            }
            renderPlaces(places);
        });
    }

    if (method !== 'static') {

        // first get current user location
        return navigator.geolocation.getCurrentPosition(function (position) {

                // than use it to load from remote APIs some places nearby
                dynamicLoadPlaces(position.coords)
                    .then((places) => {
                        renderPlaces(places);
                    })
            },
            (err) => console.error('Error in retrieving position', err),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 27000,
            }
        );
    }
};

function getPlaces(){
    return $.getJSON("/markers.json").then(function(data){
        return data;
    });
}

// function staticLoadPlaces() {
//     return [
//         {
//             name: "Your place name",
//             location: {
//                 lat: 44.493271, // change here latitude if using static data
//                 lng: 11.326040, // change here longitude if using static data
//             }
//         },
//     ];
// }


// getting places from REST APIs
function dynamicLoadPlaces(position) {
    let params = {
        radius: 1000,    // search places not farther than this value (in meters)
        clientId: 'HZIJGI4COHQ4AI45QXKCDFJWFJ1SFHYDFCCWKPIJDWHLVQVZ',   // add your credentials here
        clientSecret: '',   // add your credentials here
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    let corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    let endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        const latitude = place.location.lat;
        const longitude = place.location.lng;

        // add place icon
        const icon = document.createElement('a-image');
        icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        icon.setAttribute('name', place.name);
        icon.setAttribute('src', '/assets/img/map-marker.png');
        icon.setAttribute('id', place.id);

        // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
        icon.setAttribute('scale', '5, 5');

        icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

        const clickListener = function (ev) {
            ev.stopPropagation();
            ev.preventDefault();

            const name = ev.target.getAttribute('name');

            const el = ev.detail.intersection && ev.detail.intersection.object.el;

            if (el && el === ev.target) {
                // const label = document.createElement('span');
                // const container = document.createElement('div');
                // container.setAttribute('id', 'place-label');
                // label.innerText = name;
                // container.appendChild(label);
                // document.body.appendChild(container);
                //
                const id = ev.target.getAttribute('id');
                const url = "/markers/" + id + "/found";
                //
                // setTimeout(() => {
                //     container.parentElement.removeChild(container);
                // }, 1500);

                const form = $("#found_form");

                console.log(form.attr("action"));

                form.attr('action', url);
                form.append($('<input type="hidden" name="id" value="' + id + '">'));
                form.submit();
            }
        };

        icon.addEventListener('click', clickListener);

        scene.appendChild(icon);
    });
}