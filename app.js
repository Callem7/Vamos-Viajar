let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts.route');
let callbackRequestsRouter = require('./routes/callback-requests.route'); //Pedidos de Chamada
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route'); //importa post.route
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth');

app.set('view engine', 'ejs'); //ejs instalado

//CONECÇÂO SERVIDOR MONGOOSE
mongoose.connect(
    'mongodb+srv://Callem7:fofuinho1@mycluster.jvmwgnk.mongodb.net/Viagen', 
    {useNewUrlParser: true, useUnifiedTopology: true}
    );

app.use(express.json());    //O dado e mandado no formato json por isso converte-se no formato json
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

//CONFIGURAÇÕES
app.use(multer({storage: imageStorage}).single('imageFile'));

app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);                         //para a rota necessária ser encontrada
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/landmark', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
    
})

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.redirect('/admin');
    } else {
        resp.render('login');
    }
})

app.listen(3000, () => console.log('Listening 3000...'));