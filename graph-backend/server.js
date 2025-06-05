const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace connection string with your own)
mongoose.connect('mongodb://localhost:27017/graphDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Mongoose Schemas & Models
const nodeSchema = new mongoose.Schema({
  _id: String,
  label: String,
  x: Number,
  y: Number,
});

const edgeSchema = new mongoose.Schema({
  _id: String,
  source: String,
  target: String,
});

const Node = mongoose.model('Node', nodeSchema);
const Edge = mongoose.model('Edge', edgeSchema);

// API: Get all nodes and edges
app.get('/api/graph', async (req, res) => {
  try {
    const nodes = await Node.find({});
    const edges = await Edge.find({});
    res.json({ nodes, edges });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
