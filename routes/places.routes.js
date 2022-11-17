const router = require("express").Router()
const Place = require('./../models/Place.model')

//List Places
router.get('/', (req, res) => {

    Place
        .find()
        .sort({ name: 1 })
        .then(place => {
            res.render('places/list-places', { place })
        })
        .catch(err => console.log(err))
})


// Create Place (Render)
router.get('/create', (req, res) => {
    res.render('places/new-place')
})

// Create Place (Handle)
router.post('/create', (req, res) => {

    const { name, type, latitud, longitud } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitud, longitud]
    }

    Place
        .create({ name, type, location })
        .then(() => {
            res.redirect('/places')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/places/create')
        })
})

// Place Details
router.get('/:place_id', (req, res) => {

    const { place_id } = req.params
    console.log('hola jaddeeeeeeeeeeeeeee', place_id)
    Place
        .findById(place_id)
        .then(placeFromDB => {
            console.log(placeFromDB)
            res.render('places/place-details', placeFromDB)
        })
        .catch(err => console.log(err))
})

// Edit Place (Render)
router.get('/:place_id/edit', (req, res) => {
    const { place_id } = req.params
    Place
        .findById(place_id)
        .then(place => {
            res.render('places/edit-place', place)
        })
        .catch(err => console.log(err))
})

// Edit Place (Handle)
router.post('/:place_id/edit', (req, res) => {
    const { place_id } = req.params
    const { name, type, latitud, longitud } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitud, longitud]
    }

    Place
        .findByIdAndUpdate(place_id, { name, type, location })
        .then(() => res.redirect(`/places/${place_id}`))
        .catch(err => {
            console.log(err)
            res.redirect(`/places/${place_id}/edit`)
        })
})

// Delete Place
router.post('/:place_id/delete', (req, res) => {

    const { place_id } = req.params

    Place
        .findByIdAndDelete(place_id)
        .then(() => res.redirect('/places'))
        .catch(err => console.log(err))

})

module.exports = router