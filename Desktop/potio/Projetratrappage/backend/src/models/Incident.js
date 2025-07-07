const { getConnection } = require('../config/database');

class Incident {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.severity = data.severity;
    this.status = data.status;
    this.location = data.location;
    this.assignedTo = data.assignedTo;
    this.reportedBy = data.reportedBy;
    this.category = data.category;
    this.emergencyLevel = data.emergencyLevel;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static async findAll(filters = {}) {
    const connection = getConnection();
    let query = `
      SELECT * FROM incidents 
      WHERE 1=1
    `;
    const params = [];

    // Filtres dynamiques
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.severity) {
      query += ' AND severity = ?';
      params.push(filters.severity);
    }
    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters.location) {
      query += ' AND location LIKE ?';
      params.push(`%${filters.location}%`);
    }
    if (filters.assignedTo) {
      query += ' AND assignedTo LIKE ?';
      params.push(`%${filters.assignedTo}%`);
    }
    if (filters.search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const [rows] = await connection.execute(query, params);
    return rows.map(row => new Incident(row));
  }

  static async findById(id) {
    const connection = getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM incidents WHERE id = ?',
      [id]
    );
    return rows.length > 0 ? new Incident(rows[0]) : null;
  }

  async save() {
    const connection = getConnection();
    const now = new Date();

    if (this.id) {
      // Mise à jour
      this.updatedAt = now;
      await connection.execute(`
        UPDATE incidents SET 
          title = ?, description = ?, severity = ?, status = ?,
          location = ?, assignedTo = ?, category = ?, emergencyLevel = ?,
          updatedAt = ?
        WHERE id = ?
      `, [
        this.title, this.description, this.severity, this.status,
        this.location, this.assignedTo, this.category, this.emergencyLevel,
        this.updatedAt, this.id
      ]);
    } else {
      // Création
      this.createdAt = now;
      this.updatedAt = now;
      const [result] = await connection.execute(`
        INSERT INTO incidents (
          title, description, severity, status, location, assignedTo,
          reportedBy, category, emergencyLevel, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        this.title, this.description, this.severity, this.status,
        this.location, this.assignedTo, this.reportedBy, this.category,
        this.emergencyLevel, this.createdAt, this.updatedAt
      ]);
      this.id = result.insertId;
    }
    return this;
  }

  async delete() {
    const connection = getConnection();
    await connection.execute('DELETE FROM incidents WHERE id = ?', [this.id]);
  }

  static async getStats() {
    const connection = getConnection();
    const [stats] = await connection.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status IN ('OPEN', 'IN_PROGRESS') THEN 1 ELSE 0 END) as open,
        SUM(CASE WHEN severity = 'CRITICAL' THEN 1 ELSE 0 END) as critical,
        SUM(CASE WHEN status = 'RESOLVED' AND DATE(updatedAt) = CURDATE() THEN 1 ELSE 0 END) as resolvedToday
      FROM incidents
    `);
    return stats[0];
  }
}

module.exports = Incident;