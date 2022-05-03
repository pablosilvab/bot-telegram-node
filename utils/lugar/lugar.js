const axios = require('axios');

const getLugarLatLng = async(dir) => {

    const encodedUrl = encodeURI(dir);

    const instance = axios.create({
        baseURL: `https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=${encodedUrl}`
    });

    const resp = await instance.get();
    const data = resp.data[0];


    if (data.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const direccion = data.display_name;
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