const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const users = [
    {id: 1, name: 'tamim', email: 'tamim@gmail.com', phone: '017888888'},
    {id: 2, name: 'taskin', email: 'taskin@gmail.com', phone: '017888889'},
    {id: 3, name: 'sakib', email: 'sakib@gmail.com', phone: '017888899'},
    {id: 4, name: 'mushfiq', email: 'mushfiq@gmail.com', phone: '017888877'}
]

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from here');
})

app.get('/users', (req, res) => {
    if(req.query.name){
        const search = req.query.name.toLowerCase();
        const match = users.filter((user) => user.name.toLowerCase().includes(search));
        res.send(match);
    }
    else{
        res.send(users);
    }
})

app.get('/user/:id', (req, res) => {
    console.log(req.params)
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    res.send(user)
})

app.get('/fruits', (req, res) => {
    res.send(['mango', 'apple', 'orange']);
})

app.get('fruits/mango/fazle', (req, res) => {
    res.send('sour flavour');
})

app.post('/user', (req, res) => {
    console.log('request', req.body);
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
})

app.listen(port, () => {
    console.log('listening', port);
})
