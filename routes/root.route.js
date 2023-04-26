const { Router } = require('express')
const path = require('path')

const router = Router()

router.get('^/$|/index(.html)?', (_req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router
