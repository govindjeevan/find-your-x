window.onload = () => {
    refresh();
};

function refresh(){
    document.getElementById("Button").disabled = true;
    document.getElementById("Button").innerHTML = "Please wait...";
    setTimeout(function () {
        document.getElementById("Button").disabled = false;

        document.getElementById("Button").innerHTML = "Refresh X's around you";
    },5000);
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        getPlaces(lat, lng).then(function (data) {
            let data_locations = data['locations'];
            var places = [];
            for (let i = 0; i < data_locations.length; i++) {
                var obj = {
                    id: parseInt(data_locations[i].id),
                    name: "Place name",
                    location: {
                        lat: parseFloat(data_locations[i].lat),
                        lng: parseFloat(data_locations[i].lng)
                    }
                };
                places.push(obj);
            }
            renderPlaces(places);
        });
        }
    );
}

function getPlaces(lat, lng) {
    return $.getJSON("/markers/feed_webapp.json?lat=" + -1 + "&lng=" + -1).then(function (data) {
        return data;
    });
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    $("a-link").each(function () {
        $(this).attr("visible", false);
    });

    places.forEach((place) => {

        var myEle = $("#" + place.id);
        if (myEle.length) {
            myEle.attr("visible", true);
        } else {
            const latitude = place.location.lat;
            const longitude = place.location.lng;

        // <a-entity geometry="primitive:box;" material="shader:gif;src:url(nyancat.gif);color:green;opacity:.8"></a-entity>

            let entity = document.createElement('a-entity');
            entity.setAttribute('geometry', 'primitive:box');
            entity.setAttribute('material','shader: gif; src:url(/assets/img/2.gif);color:white');
            entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            entity.setAttribute('data-id',  place.id);
            var url = "/markers/" + place.id + "/found";
            entity.setAttribute('href', url);
            entity.setAttribute('scale','20 20 20');


            let image = document.createElement('a-image');
            image.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            image.setAttribute('src', '#tex1');
            image.setAttribute('scale','10 10 10');

            // scene.appendChild(image);

            let text = document.createElement('a-link');
            text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            text.setAttribute('id', place.id);
            text.setAttribute('title', place.name);
            text.setAttribute('href', "/markers/" + place.id + "/found");
            text.setAttribute('scale', '5 5 5');
            text.setAttribute('visible', 'true');
            text.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            // scene.appendChild(text);
            scene.appendChild(entity);
        }
    });
}