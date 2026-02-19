const postsList = require('../data/posts');

const connection = require('./../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

function show(req, res) {

    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM posts WHERE id = ?';

    const tagsSql = `
        SELECT DISTINCT tags.label
        FROM tags
        JOIN post_tag ON tags.id = post_tag.tag_id
        WHERE post_tag.post_id = ?
    `;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to show post' });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: "404 Not Found",
                message: "Post not found"
            });
        }

        const post = results[0];

        connection.query(tagsSql, [id], (err, tagsResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }

            post.tags = tagsResults.map(tag => tag.label);

            res.json(post);
        });
    });
}

function store(req, res) {

    const newId = postsList[postsList.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    postsList.push(newPost);

    console.log(newPost);


    res.status(201);
    res.json(newPost)
}

function update(req, res) {

    const postId = postsList.find(post =>
        post.id === parseInt(req.params.id));

    if (!postId) {
        res.status(404);
        return res.json({
            error: "404 Not Found",
            message: "post non trovato"
        })
    };

    postId.title = req.body.title;
    postId.content = req.body.content;
    postId.image = req.body.image;
    postId.tags = req.body.tags;

    console.log(postsList);

    res.json(postId);

}

function modify(req, res) {

    const postId = postsList.find(post =>
        post.id === parseInt(req.params.id));

    if (!postId) {
        res.status(404);
        return res.json({
            error: "404 Not Found",
            message: "post non trovato"
        })
    };

    req.body.title ? postId.title = req.body.title : postId.title;
    req.body.content ? postId.content = req.body.content : postId.content;
    req.body.image ? postId.image = req.body.image : postId.image;
    req.body.tags ? postId.tags = req.body.tags : postId.tags;

    console.log(postsList);

    res.json(postId);
}

function destroy(req, res) {

    const id = parseInt(req.params.id)

    const sql = 'DELETE FROM posts WHERE id = ?';

    connection.query(sql, [id], (err) => {
        if (err)
            return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy }