const axios = require('axios');

const getLugarLatLng = async(dir) => {

    const encodedUrl = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: { 'X-RapidAPI-Key': 'c3af7a46a1mshaee4235b0e51a54p1aef3ejsn947b3233313d' }
    });

    const resp = await instance.get();
    const data = resp.data.Results[0];

    if (data.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}