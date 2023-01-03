const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { Title, Url, Description } = req.body;
    const newLink = {
        User_id: req.user.id,
        Title,
        Url,
        Description
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    req.flash('success', 'Link saved successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE User_id = ?', [req.user.id]);
    res.render('links/list', {links: links});
});

router.get('/delete/:ID', isLoggedIn, async(req, res) => {
    const { ID } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [ID]);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
});

router.get('/edit/:ID', isLoggedIn, async(req, res) => {
    const { ID } = req.params;
    const link = await pool.query('SELECT * FROM links WHERE ID = ?', [ID]);
    res.render('links/edit', {link: link[0]});
});

router.post('/edit/:ID', isLoggedIn, async(req, res) => {
    const { ID } = req.params;
    const { Title, Description, Url } = req.body;
    const editedLink = {
        Title,
        Description,
        Url
    };
    await pool.query('UPDATE links SET ? WHERE ID = ?', [editedLink, ID]);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});

module.exports = router;