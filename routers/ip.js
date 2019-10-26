const express = require('express')
const User = require('../models/User')
const IP = require('../models/IP')
const auth = require('../middleware/auth')
const fetch = require("node-fetch")

const iprouter = express.Router()

iprouter.post('/ip', auth, async (req, res) => {
    try {
        const ip = new IP(req.body)
        let  ipdataResponse = await  fetch(`http://api.ipstack.com/${req.body.ip}?access_key=${process.env.IPSTACK_ACCESS_KEY}`);
        let ipdata= await ipdataResponse.json();

        ip.ip=ipdata.ip;
        ip.type=ipdata.type;
        ip.continent_code=ipdata.continent_code;
        ip.continent_name=ipdata.continent_name;
        ip.country_code=ipdata.country_code;
        ip.country_name=ipdata.country_name;
        ip.region_code=ipdata.region_code;
        ip.region_name=ipdata.region_name;
        ip.city=ipdata.city;
        ip.zip=ipdata.zip;
        ip.latitude=ipdata.latitude;
        ip.longitude=ipdata.longitude;
        ip.location_geoname_id=ipdata.location.geoname_id;
        ip.location_capital=ipdata.location.capital;
        ip.location_geoname_languages=JSON.stringify(ipdata.location.languages);

        ip.location_country_flag=ipdata.location.country_flag;
        ip.location_country_flag_emoji=ipdata.location.country_flag_emoji;
        ip.location_country_flag_emoji_unicode=ipdata.location.country_flag_unicode;
        ip.location_calling_code=ipdata.location.calling_code;
        ip.location_is_eu=ipdata.location.is_eu;
        await ip.save()
    
        res.status(201).send({ ip })
    } catch (error) {
        res.status(400).send(error)
    }
})

iprouter.delete('/ip', auth, async (req, res) => {
    try {
        const ip  = await  IP.find({ip: req.body.ip});
        await IP.remove({ip: req.body.ip});
        res.status(201).send({ ip })
    } catch (error) {
        res.status(400).send(error)
    }
})

iprouter.get('/ip', auth, async (req, res) => {
    try {
        
        const ip  = await  IP.find({ip: req.body.ip});
        res.status(201).send({ ip })
    } catch (error) {
        res.status(400).send(error)
    }
})







module.exports = iprouter