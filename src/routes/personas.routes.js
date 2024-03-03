import { Router } from "express";
import pool from '../database.js'

const router = Router()

router.get('/add', (req, res) => {
    res.render('personas/add')
})

router.post('/add', async (req, res) => {
    try {
        const { name, lastname, age } = req.body
        const newPerson = {
            name,
            lastname,
            age
        }
        await pool.query('INSERT INTO personas SET ?', [newPerson])
        res.redirect('/list')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/list', async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT * FROM personas')
        res.render('personas/list', { personas: result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router