import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

//generate accesstoken
const generateAccessToken = (user) => {
    return jwt.sign( { id: user.id, isAdmin: user.isAdmin }, "TokenSecurityKey", {expiresIn : '1000s'})
}

//Books
const Books = [
    {
        id: 1,
        BookName: "PHP 8",
        YearPublished: "2023",
        Author: "VicS",
        Category: "Web",
        status: 1,
    },
    {
        id: 2,
        BookName: "React.js",
        YearPublished: "2000",
        Author: "Peter SMith",
        Category: "Web",
        status: 1,
    },
    {
        id: 3,
        BookName: "CSS framework",
        YearPublished: "2005",
        Author: "Jaguar",
        Category: "Web",
        status: 1,
    },
    {
        id: 4,
        BookName: "Data Science",
        YearPublished: "2023",
        Author: "Vic S",
        Category: "Data",
        status: 1,
    },
]

//registered user
const LoginProfiles = [

    {
        id: 1,
        username: "admin",
        password: "admin",
        isAdmin: true,
    },
    {
        id: 2,
        username: "staff",
        password: "123456",
        isAdmin: false,
    },
    {
        id: 3,
        username: "vice",
        password: "abrakadabra",
        isAdmin: false,
    },
{
        id: 4,
        username: "super",
        password: "69843",
        isAdmin: true,
    },
{
        id: 5,
        username: "user",
        password: "123",
        isAdmin: false,
    }
];

app.post('/api/login', (req, res) => {
    const { userID, passkey } = req.body;
  
    const sample = LoginProfiles.find((profile) => {
      return profile.username === userID && profile.password === passkey;
    });
  
    if (sample) {
      console.log('Success');

      res.status(200).json({
        code: 'Success',
        username: sample.username,
      });
    } else {
      res.status(401).json({
        error: 'Failed',
      });
    }
  });


//for login
app.post('/login', (req, res) => {
    const {username, password} = req.body;

    const user = LoginProfiles.find((u) => {
        return u.username === username && u.password === password;
    });

    if(user) {

    const accessToken = generateAccessToken(user);
       
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken
        })
            
    } else {
        res.status(400).json('Username and Password is incorrect.')
    }
})

//middleware for security
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;

        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, 'TokenSecurityKey', (err, user) => {
                if(err) {
                    return res.status(403).json('TokenKey not valid')
                }
                req.user = user;
                next();
            })
        } else {
            return res.status(403).json('You are not authenticated');
        }
}


// books
app.get('/books/:bookId', verify, (req, res) => {
    // Check if the user is an admin
    if (req.user.isAdmin === false) {
      return res.status(403).json('You are not authenticated as an admin.');
    }
  
    const bookData = Books.find((b) => {
      return parseInt(req.params.bookId) === parseInt(b.id);
    });
  
    if (bookData) {
      res.json({
        Book: bookData
      });
    } else {
      res.status(404).json('Book not found.');
    }
  });

app.listen(5000)
console.log('Server is running.')