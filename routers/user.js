const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const fetch = require("node-fetch")

const router = express.Router()

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        let  ipdataResponse = await  fetch(`http://api.ipstack.com/check?access_key=${process.env.IPSTACK_ACCESS_KEY}`);
        let ipdata= await ipdataResponse.json();
        console.log(ipdata);

        user.ip=ipdata.ip;

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }

                const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get('/users/me', auth, async(req, res) => {
    // Return information about the current user
    res.send(req.user)
})

router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router