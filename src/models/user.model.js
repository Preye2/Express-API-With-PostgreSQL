const pool = require('../config/db');

const User = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  },
  
  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0];
  },
  
  async create({ name, email }) {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return rows[0];
  },
  
  async update(id, { name, email }) {
    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return rows[0];
  },
  
  async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
};

module.exports = User;