const mongoose = require("mongoose")

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
];



const users = [
    {
        "_id": userIds[0],
        "username": "Moses Bliss",
        "email": "bliss@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "moses-bliss.jpg",
        "backgroundBg": "moses-bliss.jpg",
        "nickname": "blissom",
        "followers": [],
        "followings": [],
        "location": "Nigeria, FCT",
        "occupation": "Gospel Artist",
        "viewedProfile": 14561,
        "impressions": 888822,
        "createdAt": 1115211422,
        "updatedAt": 1115211422,
        "__v": 0,
    },
    {
        "_id": userIds[1],
        "username": "Testimony",
        "email": "testy@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "testimony.jpg",
        "backgroundBg": "45508742.jpg",
        "nickname": "testie",
        "followers": [],
        "followings": [],
        "location": "New York, CA",
        "occupation": "Model",
        "viewedProfile": 12351,
        "impressions": 55555,
        "createdAt": 1595589072,
        "updatedAt": 1595589072,
        "__v": 0,
    },
    {
        "_id": userIds[2],
        "username": "Elon Musk",
        "email": "elon@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "elon-musk.jpg",
        "backgroundBg": "bot.jpeg",
        "nickname": "elon-musk",
        "followers": [],
        "followings": [],
        "location": "Canada, CA",
        "occupation": "Data Scientist Hacker",
        "viewedProfile": 45468,
        "impressions": 19986,
        "createdAt": 1288090662,
        "updatedAt": 1288090662,
        "__v": 0,
    },
    {
        "_id": userIds[3],
        "username": "Juliet Jackson",
        "email": "juliet@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "cinderella.jpeg",
        "backgroundBg": "cinderella.jpeg",
        "nickname": "cinderella",
        "followers": [],
        "followings": [],
        "location": "Korea, CA",
        "occupation": "Educator",
        "viewedProfile": 41024,
        "impressions": 55316,
        "createdAt": 1219214568,
        "updatedAt": 1219214568,
        "__v": 0,
    },
    {
        "_id": userIds[4],
        "username": "Dev. Harrison",
        "email": "harrison@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "dev-harrison.jpg",
        "backgroundBg": "chatbot.jpg",
        "nickname": "dev_harrison",
        "followers": [],
        "followings": [],
        "location": "Utah, CA",
        "occupation": "Hacker",
        "viewedProfile": 40212,
        "impressions": 7758,
        "createdAt": 1493463661,
        "updatedAt": 1493463661,
        "__v": 0,
    },
    {
        "_id": userIds[5],
        "username": "Maloney",
        "email": "maloney18@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "cutty.png",
        "backgroundBg": "cutty.png",
        "nickname": "cutty",
        "followers": [],
        "followings": [],
        "location": "Los Angeles, CA",
        "occupation": "Journalist",
        "viewedProfile": 976,
        "impressions": 4658,
        "createdAt": 1381326073,
        "updatedAt": 1381326073,
        "__v": 0,
    },
    {
        "_id": userIds[6],
        "username": "Bella Cory",
        "email": "bella@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "profile-3.jpg",
        "backgroundBg": "profile-3.jpg",
        "nickname": "Bella",
        "followers": [],
        "followings": [],
        "location": "Chicago, IL",
        "occupation": "Nurse",
        "viewedProfile": 1510,
        "impressions": 77579,
        "createdAt": 1714704324,
        "updatedAt": 1642716557,
        "__v": 0,
    },
    {
        "_id": userIds[7],
        "username": "Cynthia",
        "email": "cynthia@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "cynthia.jpeg",
        "backgroundBg": "cynthia.jpeg",
        "nickname": "Saintcynth",
        "followers": [],
        "followings": [],
        "location": "Washington, DC",
        "occupation": "A Student",
        "viewedProfile": 19420,
        "impressions": 82970,
        "createdAt": 1369908044,
        "updatedAt": 1359322268,
        "__v": 0,
    },
    {
        "_id": userIds[8],
        "username": "Jessica",
        "email": "jessicadunn@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "profile-2.jpg",
        "backgroungBg": "profile-2.jpg",
        "nickname": "Jessy",
        "followers": [],
        "followings": [],
        "location": "Washington, DC",
        "occupation": "A Student",
        "viewedProfile": 19420,
        "impressions": 82970,
        "createdAt": 1369908044,
        "updatedAt": 1359322268,
        "__v": 0,
    },
    {
        "_id": userIds[9],
        "username": "Derick",
        "email": "derick@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "picsPath": "derick.jpeg",
        "backgroundBg": "derick.jpeg",
        "nickname": "derick",
        "followers": [],
        "followings": [],
        "location": "Washington, DC",
        "occupation": "A Father, husband and apple of God's eye",
        "viewedProfile": 19420,
        "impressions": 82970,
        "createdAt": 1369908044,
        "updatedAt": 1359322268,
        "__v": 0,
    },
    {
        "_id": userIds[10],
        "username": "Patrick",
        "email": "patrick@gmail.com",
        "pwd": "$2b$10$zkCE5Hwppw3e4ZUwGXWW9OJm8aEmg./aSf9.pvjDB1tJWrOjowlxq",
        "backgroundBg": "patrick.jpeg",
        "picsPath": "patrick.jpeg",
        "nickname": "patrick",
        "followers": [],
        "followings": [],
        "location": "Washington, DC",
        "occupation": "A Father, husband and apple of God's eye",
        "viewedProfile": 19420,
        "impressions": 82970,
        "createdAt": 1369908044,
        "updatedAt": 1359322268,
        "__v": 0,
    }
];

const posts = [
    {
        "_id": new mongoose.Types.ObjectId(),
        "userId": userIds[1],
        "username": "Testimony",
        "location": "New York, CA",
        "description": "Some really long random description",
        "picsPath": "1690754313811_426.jpg",
        "userPicsPath": "",
        "likes": new Map([
            [userIds[0], true],
            [userIds[2], true],
            [userIds[3], true],
            [userIds[4], true],
            [userIds[10], true],
        ]),
        "comments": [
            {
                "picsPath": "1691506767149_331.jpeg",
                "comment": "I lied again, one more random comment",

                "_id": "64d4c6fefc463c62d35829a6"
            },

        ],
    },
    {
        "_id": new mongoose.Types.ObjectId(),
        "userId": userIds[3],
        "username": "Juliet Jackson",
        "location": "Korea, CA",
        "description":
            "Another really long random description. This one is longer than the previous one.",
        "picsPath": "1691576355680_457.jpg",
        "userPicsPath": "1691509588422_911.jpeg",
        "likes": new Map([
            [userIds[7], true],
            [userIds[4], true],
            [userIds[1], true],
            [userIds[2], true],
        ]),
        "comments": [
            {
                "picsPath": "1691506767149_331.jpeg",
                "comment": "I lied again, one more random comment",

                "_id": "64d4c6fefc463c62d35829a6"
            },

        ],
    },
    {
        "_id": new mongoose.Types.ObjectId(),
        userId: userIds[4],
        "username": "Dev. Harrison",
        "location": "Utah, CA",
        "description":
            "This is the last really long random description. This one is longer than the previous one.",
        "picsPath": "1690755388135_17.jpg",
        "userPicsPath": "1690752634452_518.jpg",
        "likes": new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
            [userIds[5], true],
            [userIds[10], true],

        ]),
        "comments": [
            {
                "picsPath": "1691506767149_331.jpeg",
                "comment": "I lied again, one more random comment",

                "_id": "64d4c6fefc463c62d35829a6"
            },

        ],
    },
    {
        "_id": new mongoose.Types.ObjectId(),
        "userId": userIds[5],
        "username": "Maloney",
        "location": "Los Angeles, CA",
        "description":
            "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
        "picsPath": "1690754313811_426.jpg",
        "userPicsPath": "1691506509822_669.png",
        "likes": new Map([
            [userIds[1], true],
            [userIds[6], true],
            [userIds[3], true],
        ]),
        "comments": [
            {
                "picsPath": "1691506767149_331.jpeg",
                "comment": "I lied again, one more random comment",

                "_id": "64d4c6fefc463c62d35829a6"
            },

        ],
    },
    {
        "_id": new mongoose.Types.ObjectId(),
        "userId": userIds[6],
        "username": "Bella Cory ",
        "location": "Chicago, IL",
        "description":
            "I'm happy the operation went well.",
        "picsPath": "1691576673917_804.jpeg",
        "userPicsPath": "",
        "likes": new Map([
            [userIds[1], true],
            [userIds[3], true],
            [userIds[5], true],
            [userIds[7], true],
        ]),
        "comments": [
            {
                "picsPath": "1691506767149_331.jpeg",
                "comment": "I lied again, one more random comment",

                "_id": "64d4c6fefc463c62d35829a6"
            },
        ],
    },
    {
        "_id": new mongoose.Types.ObjectId(),
        "userId": userIds[7],
        "username": "Cynthia",
        "location": "Washington, DC",
        "description":
            "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        "picsPath": "post-5.jpeg",
        "userPicsPath": "1691506767149_331.jpeg",
        "likes": new Map([
            [userIds[1], true],
            [userIds[2], true],
            [userIds[10], true],
        ]),

        "comments": [

            {
                "picsPath": "1690757283168_585.jpg",
                "comment": "No let's actually study",
                "_id": "64d4c6fefc463c62d35829a6"
            },

        ],
    },
];


module.exports = { users, posts }

