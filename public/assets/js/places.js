window.onload = () => {
    function logic(position) {

        console.log('interval');
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        getPlaces(lat, lng).then(function (data) {
            let datal = data['locations'];
            var places = [];
            for (let i = 0; i < datal.length; i++) {
                var obj = {
                    id: parseInt(datal[i].id),
                    name: "Place name",
                    location: {
                        lat: parseFloat(datal[i].lat),
                        lng: parseFloat(datal[i].lng)
                    }
                };
                places.push(obj);
            }
            renderPlaces(places);
        });
    }

    navigator.geolocation.getCurrentPosition(
        logic,
        (err) => console.error('Error in retrieving position', err)
    );
    //
    setInterval(function () {
        navigator.geolocation.getCurrentPosition(
            logic,
            (err) => console.error('Error in retrieving position', err)
        );
    }, 5000);
};

function getPlaces(lat, lng) {
    return $.getJSON("/markers/feed.json?lat=" + -1 + "&lng=" + -1).then(function (data) {
        return data;
    });
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    console.log($("a-link").length);

    $("a-link").each(function () {
        $(this).attr("visible", false);
    });

    places.forEach((place) => {

        var myEle = $("#" + place.id);
        if (myEle.length) {
            myEle.attr("visible", true);
        } else {
            let text = document.createElement('a-link');

            const latitude = place.location.lat;
            const longitude = place.location.lng;

            text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
            text.setAttribute('id', place.id);
            text.setAttribute('title', 'My x');
            text.setAttribute('href', "/markers/" + place.id + "/found");
            text.setAttribute('scale', '5 5 5');
            text.setAttribute('visible', 'true');
            text.addEventListener('loaded', () => {
                window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
            });

            scene.appendChild(text);
        }
    });
}