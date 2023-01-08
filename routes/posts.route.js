let uniqid = require('uniqid');  //Para que cada vez o servidor recomeçar o id não comece em 1
let Post = require('../models/post.model').Post;
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');

let defaultImgPath = 'images/'; //caminho das imagens

router.get('/', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

router.post('/', authMiddleware, async (req, resp) => { //Aqui leva informação do corpo do post pedido
    let reqBody = req.body;
    let imgPath;
    console.log(req.body);
    console.log(req.body.country);
    if(reqBody.imageURL) {
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.split('\\').pop().split('/').pop(); //caminho de imagens
        imgPath = defaultImgPath.concat(imgPath);
        //imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    }
    let newPost = new Post({        //Cria um novo objeto de uma nova submissão
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    await newPost.save();
    resp.send('Criado');
})

//ROTA PARA A ELIMINAÇÃO DE SUBMISSÕES
router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Eliminado');
})

//ROTA PARA A ATUALIZAÇÃO DE SUBMISSÕES
router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Atualizado');
})

module.exports = router; //exporta router