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
            var places = [];
            for (let i = 0; i < data.length; i++) {
                var obj = {
                    id: parseInt(data[i].speaker_id),
                    name: data[i].speaker_title,
                    location: {
                        lat: parseFloat(data[i].lat),
                        lng: parseFloat(data[i].lng)
                    }
                };
                places.push(obj);
            }
            renderPlaces(places);
        });
    });
}

function getPlaces(lat, lng) {
    return $.getJSON("/markers/feed_webapp.json?lat=" + lat + "&lng=" + lng).then(function (data) {
        return data;
    });
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    $("a-entity").each(function () {
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
            entity.setAttribute('link-href', url);
            entity.setAttribute('scale','10 10 10');


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