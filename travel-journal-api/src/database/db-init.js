require("dotenv").config();
const cryptoService = require("../services/crypto-service.js");
const { createPool } = require("./mysql-connection.js");
const { faker } = require("@faker-js/faker");

const DATABASE_NAME = process.env.MYSQL_DATABASE;

const initDB = async () => {
    const pool = createPool();
    //BORRO LA BASE DE DATOS SI EXISTE
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);

    //CREO LA BASE DE DATOS
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);

    //CREO LA TABLA DE USUARIOS
    await createDatabaseTables(pool);

    await insertAdminUsers(pool);

    await generateFakeData(pool);

    await pool.end();
};

async function createDatabaseTables(pool) {
    await pool.query(`
    CREATE TABLE users(
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        avatarURL VARCHAR(300),
        password VARCHAR(150) NOT NULL,
        birthDate DATE NOT NULL,
        country VARCHAR(150),
        acceptedTOS BOOL NOT NULL,
        emailValidated BOOL DEFAULT false,
        admin BOOL DEFAULT false
    )`);
    await pool.query(`
    CREATE TABLE posts(
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        userId CHAR(36) NOT NULL,
        place VARCHAR(150),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);
    await pool.query(`
    CREATE TABLE post_likes(
        id CHAR(36) PRIMARY KEY,
        userId CHAR(36) NOT NULL,
        postId CHAR(36) NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    )`);
    await pool.query(`
    CREATE TABLE post_comments(
        id CHAR(36) PRIMARY KEY,
        userId CHAR(36) NOT NULL,
        postId CHAR(36) NOT NULL,
        comment VARCHAR(300) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    )`);
    await pool.query(`
    CREATE TABLE post_photos(
        id CHAR(36) PRIMARY KEY,
        postId CHAR(36) NOT NULL,
        imageURL VARCHAR(300) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
    )`);
    await pool.query(`
    CREATE TABLE validation_codes(
        id CHAR(36) PRIMARY KEY,
        userId CHAR(36) NOT NULL,
        code CHAR(8) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )`);
}

async function insertAdminUsers(pool) {
    await pool.execute(
        `
      INSERT INTO users(id,name,email,password,birthDate,acceptedTOS,country,emailValidated,admin) 
      VALUES(?,?,?,?,?,?,?,?,?)  
    `,
        [
            cryptoService.generateUUID(),
            "IZUH",
            "admin@admin.com",
            await cryptoService.hashPassword("admin1234"),
            "1998-02-08",
            true,
            "España",
            true,
            true,
        ]
    );
}

async function generateFakeData(pool) {
    const [users, posts] = await generateUsersAndPosts();

    for (const user of users) {
        await pool.execute(
            `
        INSERT INTO users(id,name,email,password,birthDate,acceptedTOS,country,emailValidated,avatarURL)
        VALUES(?,?,?,?,?,?,?,?,?)
      `,
            [
                user.id,
                user.name,
                user.email,
                user.password,
                user.birthDate,
                user.acceptedTOS,
                user.country,
                user.emailValidated,
                user.avatarURL,
            ]
        );
    }

    for (const post of posts) {
        await pool.execute(
            `
          INSERT INTO posts(id,title,description,place,userId)
          VALUES(?,?,?,?,?)
        `,
            [post.id, post.title, post.content, post.place, post.userId]
        );

        //for each phot
        for (const photo of post.photos) {
            await pool.execute(
                `
        INSERT INTO post_photos(id,postId,imageURL)
        VALUES(?,?,?)
        `,
                [photo.id, post.id, photo.imageURL]
            );
        }

        const comments = generateComments(post, users);

        for (const comment of comments) {
            await pool.execute(
                `
            INSERT INTO post_comments(id,userId,postId,comment)
            VALUES(?,?,?,?)
          `,
                [comment.id, comment.userId, comment.postId, comment.content]
            );
        }

        const likes = generateLikes(post, users);

        for (const like of likes) {
            await pool.execute(
                `
            INSERT INTO post_likes(id,userId,postId)
            VALUES(?,?,?)
          `,
                [like.id, like.userId, like.postId]
            );
        }
    }
}

async function generateUsersAndPosts() {
    const users = [];
    const posts = [];
    const numUsers = Math.floor(Math.random() * 11) + 10;

    for (let i = 0; i < numUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const id = cryptoService.generateUUID();
        const minBirthDate = new Date();
        minBirthDate.setFullYear(minBirthDate.getFullYear() - 20);
        const maxBirthDate = new Date();
        maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 30);
        const randomBirthDate = faker.date.between({
            from: maxBirthDate,
            to: minBirthDate,
        });
        const user = {
            id: id,
            name: firstName + " " + lastName,
            avatarURL: "https://i.pravatar.cc/150?u=" + id,
            email: faker.internet.email({
                firstName: firstName,
                lastName: lastName,
            }),
            password: await cryptoService.hashPassword(
                faker.internet.password()
            ),
            birthDate: randomBirthDate,
            country: faker.location.country(),
            acceptedTOS: true,
            emailValidated: true,
            posts: [],
        };

        const numPostsPerUser = Math.floor(Math.random() * 9) + 5;

        for (let j = 0; j < numPostsPerUser; j++) {
            const numImages = Math.floor(Math.random() * 6) + 1;
            const post = {
                id: cryptoService.generateUUID(),
                title: faker.lorem.sentence({ min: 1, max: 3 }),
                content: faker.lorem.paragraphs({ min: 1, max: 3 }),
                place: faker.location.country(),
                userId: user.id,
                photos: [],
            };
            posts.push(post);

            for (let k = 0; k < numImages; k++) {
                const photo = {
                    id: cryptoService.generateUUID(),
                    imageURL: faker.image.urlPicsumPhotos(),
                };
                post.photos.push(photo);
            }
        }

        users.push(user);
    }

    return [users, posts];
}

function generateComments(post, users) {
    const numComments = Math.floor(Math.random() * 10) + 1;
    const comments = [];

    for (let i = 0; i < numComments; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const comment = {
            id: cryptoService.generateUUID(),
            content: faker.lorem.sentence({ min: 1, max: 3 }),
            userId: user.id,
            postId: post.id,
        };
        comments.push(comment);
    }

    return comments;
}

function generateLikes(post, users) {
    const numLikes = Math.floor(Math.random() * users.length) + 1;
    const likes = [];
    const remainingUsers = [...users];

    for (let i = 0; i < numLikes; i++) {
        const userIndex = Math.floor(Math.random() * remainingUsers.length);
        const user = remainingUsers[userIndex];
        remainingUsers.splice(userIndex, 1);

        const like = {
            id: cryptoService.generateUUID(),
            userId: user.id,
            postId: post.id,
        };
        likes.push(like);
    }

    return likes;
}

initDB();
