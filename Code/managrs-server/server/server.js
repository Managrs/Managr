const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Results route
app.get('/results', (req, res) => {
  const title = req.query.title || '';
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || Infinity;

  const parsePrice = (priceStr) => {
    const match = priceStr.match(/R(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const filtered = mockFreelancers.filter(f => {
    const fPrice = parsePrice(f.price);
    return (
      f.title.toLowerCase().includes(title.toLowerCase()) &&
      fPrice >= minPrice &&
      fPrice <= maxPrice
    );
  });

  res.json({
    searchTitle: title,
    freelancers: filtered
  });
});

// Dummy data
const mockFreelancers = [
    { name: "John Doe", title: "Web Design", price: "R950/hr", skills: ["HTML", "CSS", "JavaScript"] },
    { name: "Jane Smith", title: "Web Design", price: "R850/hr", skills: ["HTML", "CSS", "React"] },
    { name: "Emily Adams", title: "Graphic Design", price: "R1200/hr", skills: ["Photoshop", "Illustrator", "InDesign"] },
    { name: "Mark Lee", title: "Graphic Design", price: "R1100/hr", skills: ["Photoshop", "Illustrator", "Logo Design"] },
    { name: "Chris Brown", title: "Writing", price: "R700/hr", skills: ["Creative Writing", "SEO", "Copywriting"] },
    { name: "Anna Davis", title: "Writing", price: "R650/hr", skills: ["Content Writing", "Blogging", "SEO"] },
    { name: "Lebo Mokoena", title: "Translation", price: "R500/hr", skills: ["Zulu", "English", "Afrikaans"] },
    { name: "Sipho Dlamini", title: "Mobile App Development", price: "R1500/hr", skills: ["Flutter", "Dart", "Firebase"] },
    { name: "Thandiwe Ndlovu", title: "Data Analysis", price: "R1300/hr", skills: ["Python", "Pandas", "Excel"] },
    { name: "Jason Pillay", title: "Video Editing", price: "R900/hr", skills: ["Premiere Pro", "Final Cut", "After Effects"] },
    { name: "Mpho Maleka", title: "Music Production", price: "R1100/hr", skills: ["Logic Pro", "FL Studio", "Mixing"] },
    { name: "Zanele Khumalo", title: "Virtual Assistance", price: "R600/hr", skills: ["Scheduling", "Admin", "Customer Service"] }
];

// Start server
const port = 5173;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
