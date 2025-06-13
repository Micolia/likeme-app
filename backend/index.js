import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
})

app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Errore nel recupero dei post')
  }
})

// ADD

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body
    const query = 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0)'
    await pool.query(query, [titulo, url, descripcion])
    res.send('Post creato con successo')
  } catch (error) {
    console.error(error)
    res.status(500).send('Errore nella creazione del post')
  }
})

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`)
})

// UPDATE
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params
    const query = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *'
    const result = await pool.query(query, [id])

    if (result.rowCount === 0) {
      return res.status(404).send('Post non trovato')
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send('Errore nell\'aggiornamento dei likes')
  }
})

// DELETE
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const query = 'DELETE FROM posts WHERE id = $1 RETURNING *'
    const result = await pool.query(query, [id])

    if (result.rowCount === 0) {
      return res.status(404).send('Post non trovato')
    }

    res.send('Post eliminato con successo')
  } catch (error) {
    console.error(error)
    res.status(500).send('Errore nell\'eliminazione del post')
  }
})
