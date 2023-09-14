const { getConnection } = require("../database/mysql-connection.js");

const db = getConnection();

module.exports = {
    async saveUser(user) {
        const statement = `
    INSERT INTO users(id,name,email,password,birthDate,country,acceptedTOS,emailValidated,avatarURL)
    VALUES(?,?,?,?,?,?,?,?,?)
    `;
        await db.execute(statement, [
            user.id,
            user.name,
            user.email,
            user.password,
            user.birthDate,
            user.country || null,
            user.acceptedTOS,
            user.emailValidated,
            user.avatarURL,
        ]);
    },
    /**
     * Esta función devuelve un usuario en base a su EMAIL
     * con TODOS SUS DATOS (Incluyendo la contraseña hasheada)
     */
    async getUserByEmailUNSAFE(email) {
        const statement = `
      SELECT *
      FROM users
      WHERE users.email = ?
    `;
        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    async getUserByEmail(email) {
        const statement = `
      SELECT id,name,email,emailValidated
      FROM users
      WHERE users.email = ?
    `;
        const [rows] = await db.execute(statement, [email]);

        return rows[0];
    },

    async getEnabledUsers() {
        return usersTable.filter((user) => {
            return user.emailValidated;
        });
    },
    async saveValidationCode(code) {
        const statement = `
    INSERT INTO validation_codes(id,userId,code)
    VALUES(?,?,?)
    `;
        await db.execute(statement, [code.id, code.userId, code.code]);
    },
    async getAllUsers() {
        return usersTable;
    },

    async getAllPosts(sortBy = "date") {
        let orderByClause = "ORDER BY p.createdAt DESC";
        if (sortBy === "likes") {
            orderByClause = "ORDER BY likes DESC";
        }
        const statement = `
    SELECT
      p.id,
      p.userId,
      p.title,
      p.description,
      p.place,
      COALESCE(l.like_count, 0) AS likes,
      COALESCE(c.comment_count, 0) as comments,
      (
        SELECT imageURL
        FROM post_photos
        WHERE postId = p.id
        ORDER BY id ASC
        LIMIT 1
      ) as mainImage,
      u.name as userName,
      u.avatarURL as userAvatar,
      p.createdAt
    FROM
      posts p
      LEFT JOIN users u ON p.userId = u.id
      LEFT JOIN (
        SELECT postId, COUNT(*) AS like_count
        FROM post_likes
        GROUP BY postId
      ) l ON p.id = l.postId
      LEFT JOIN (
        SELECT postId, COUNT(*) AS comment_count
        FROM post_comments
        GROUP BY postId
      ) c ON p.id = c.postId
    ${orderByClause}
  `;
        const [rows] = await db.execute(statement);
        return rows.map((p) => {
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                likes: p.likes,
                comments: p.comments,
                mainImage: p.mainImage,
                createdAt: p.createdAt,
                place: p.place,
                user: {
                    id: p.userId,
                    name: p.userName,
                    avatarURL: p.userAvatar,
                },
            };
        });
    },

    async savePost(post) {
        const statement = `
    INSERT INTO posts(id,userId,title,description,place)
    VALUES(?,?,?,?,?)
    `;
        await db.execute(statement, [
            post.id,
            post.userId,
            post.title,
            post.description,
            post.place,
        ]);
    },

    async updatePost(post) {
        const statement = `
    UPDATE posts
    SET title = ?, description = ?, place = ?
    WHERE id = ?
    `;
        await db.execute(statement, [
            post.title,
            post.description,
            post.place,
            post.id,
        ]);
    },

    async getPostById(postId) {
        const statement = `
      SELECT *
      FROM posts as p
      WHERE p.id = ?
    `;
        const [rows] = await db.execute(statement, [postId]);

        return rows[0];
    },

    async getUserInfoByUserId(userId) {
        const statement = `
        SELECT
            u.id as userid,
            u.name as userName,
            u.avatarURL as userAvatar,
            u.birthDate as birthDate,
            u.country as country
        FROM
            users u
        WHERE
            u.id = ?`;

        const [rows] = await db.execute(statement, [userId]);

        return rows.map((user) => {
            return {
                id: user.userid,
                name: user.userName,
                avatarURL: user.userAvatar,
                birthDate: user.birthDate,
                country: user.country,
            };
        });
    },

    async getUserInfoByPostId(postId) {
        const statement = `
        SELECT
            p.id,
            p.userId as userid,
            u.name as userName,
            u.avatarURL as userAvatar
        FROM
            posts p
            LEFT JOIN users u ON p.userId = u.id
        WHERE
            p.id = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows.map((p) => {
            return {
                id: p.userid,
                name: p.userName,
                avatarURL: p.userAvatar,
            };
        });
    },

    async getPostsByUserId(userId, sortBy = "date") {
        let orderByClause = "ORDER BY p.createdAt DESC";
        if (sortBy === "likes") {
            orderByClause = "ORDER BY likes DESC";
        }
        const statement = `
        SELECT
            p.id,
            p.userId,
            p.title,
            p.description,
            COALESCE(l.like_count, 0) AS likes,
            COALESCE(c.comment_count, 0) as comments,
            (
                SELECT imageURL
                FROM post_photos
                WHERE postId = p.id
                ORDER BY id ASC
                LIMIT 1
            ) as mainImage,
            u.name as userName,
            u.avatarURL as userAvatar,
            p.createdAt
        FROM
            posts p
            LEFT JOIN users u ON p.userId = u.id
            LEFT JOIN (
                SELECT postId, COUNT(*) AS like_count
                FROM post_likes
                GROUP BY postId
            ) l ON p.id = l.postId
            LEFT JOIN (
                SELECT postId, COUNT(*) AS comment_count
                FROM post_comments
                GROUP BY postId
            ) c ON p.id = c.postId
        WHERE
            p.userId = ?
        ${orderByClause}
    `;
        const [rows] = await db.execute(statement, [userId]);
        return rows.map((p) => {
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                likes: p.likes,
                comments: p.comments,
                mainImage: p.mainImage,
                createdAt: p.createdAt,
                user: {
                    id: p.userId,
                    name: p.userName,
                    avatarURL: p.userAvatar,
                },
            };
        });
    },

    async getCommentsByPostId(postId) {
        const statement = `
      SELECT 
        cp.id, 
        cp.comment,
        cp.createdAt,
        cp.userId,
        cp.postId,
        u.name as userName,
        u.avatarURL as userAvatar 
      FROM post_comments as cp
      LEFT JOIN users as u ON u.id = cp.userId
      WHERE cp.postId = ?
      ORDER BY cp.createdAt
    `;
        const [rows] = await db.execute(statement, [postId]);

        return rows.map((comment) => {
            return {
                id: comment.id,
                comment: comment.comment,
                createdAt: comment.createdAt,
                user: {
                    id: comment.userId,
                    name: comment.userName,
                    avatarURL: comment.userAvatar,
                },
            };
        });
    },

    async saveComment(postComment) {
        const statement = `
    INSERT INTO post_comments(id,userId,postId,comment)
    VALUES(?,?,?,?)
    `;
        await db.execute(statement, [
            postComment.id,
            postComment.userId,
            postComment.postId,
            postComment.comment,
        ]);
    },

    async createLike(like) {
        const statement = `
    INSERT INTO post_likes(id,userId,postId)
    VALUES(?,?,?)
    `;
        await db.execute(statement, [like.id, like.userId, like.postId]);
    },

    async likeExists(postId, userId) {
        const statement = `
    SELECT * FROM post_likes
    WHERE postId = ? and userId = ?
    `;
        const [rows] = await db.execute(statement, [postId, userId]);
        return !!rows[0];
    },

    async deleteLikeByUserId(postId, userId) {
        const statement = `
    DELETE FROM post_likes
    WHERE postId = ? and userId = ?
    `;
        await db.execute(statement, [postId, userId]);
    },

    async countLikesByPostId(postId) {
        const statement = `
    SELECT COUNT(*) as likes FROM post_likes
    WHERE postId = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].likes;
    },

    async countCommentsByPostId(postId) {
        const statement = `
    SELECT COUNT(*) as comments FROM post_comments
    WHERE postId = ?
    `;
        const [rows] = await db.execute(statement, [postId]);
        return rows[0].comments;
    },

    async deletePost(postId) {
        const statement = `
    DELETE FROM posts
    WHERE id = ?
    `;
        await db.execute(statement, [postId]);
    },

    async updateComment(commentId, commentPayload) {
        const statement = `
    UPDATE post_comments
    SET comment = ?
    WHERE id = ?
    `;
        await db.execute(statement, [commentPayload.comment, commentId]);
    },

    async deleteComment(commentId) {
        const statement = `
    DELETE FROM post_comments
    WHERE id = ?
    `;
        await db.execute(statement, [commentId]);
    },

    async getCommentById(commentId) {
        const statement = `
    SELECT * FROM post_comments
    WHERE id = ?
    `;
        const [rows] = await db.execute(statement, [commentId]);
        return rows[0];
    },

    async createCommentLike(like) {
        const statement = `
            INSERT INTO comment_likes(id, userId, commentId)
            VALUES(?, ?, ?)
        `;
        await db.execute(statement, [like.id, like.userId, like.commentId]);
    },

    async likeCommentExists(commentId, userId) {
        const statement = `
            SELECT * FROM comment_likes
            WHERE commentId = ? AND userId = ?
        `;
        const [rows] = await db.execute(statement, [commentId, userId]);
        return !!rows[0];
    },

    async deleteCommentLikeByUserId(commentId, userId) {
        const statement = `
            DELETE FROM comment_likes
            WHERE commentId = ? AND userId = ?
        `;
        await db.execute(statement, [commentId, userId]);
    },

    async countCommentLikesByCommentId(commentId) {
        const statement = `
            SELECT COUNT(*) AS likes FROM comment_likes
            WHERE commentId = ?
        `;
        const [rows] = await db.execute(statement, [commentId]);
        return rows[0].likes;
    },

    async savePhoto(photo) {
        const statement = `
    INSERT INTO post_photos(id,postId,imageURL)
    VALUES(?,?,?)
    `;
        await db.execute(statement, [photo.id, photo.postId, photo.imageURL]);
    },

    async getPhotoById(photoId) {
        const statement = `
    SELECT * FROM post_photos
    WHERE id = ?
    `;
        const [rows] = await db.execute(statement, [photoId]);
        return rows[0];
    },

    async deletePhoto(photoId) {
        const statement = `
    DELETE FROM post_photos
    WHERE id = ?
    `;
        await db.execute(statement, [photoId]);
    },

    async getPhotosByPostId(postId) {
        const statement = `
      SELECT *
      FROM post_photos as pp
      WHERE pp.postId = ?
    `;
        const [rows] = await db.execute(statement, [postId]);

        return rows;
    },

    async updateUserAvatar(userId, avatarURL) {
        const statement = `
    UPDATE users 
    SET avatarURL = ?
    WHERE id = ?
  `;

        await db.execute(statement, [avatarURL, userId]);
    },

    async getValidationCodeByUserId(userId) {
        const statement = `
      SELECT *
      FROM validation_codes
      WHERE userId = ?
    `;
        const [rows] = await db.execute(statement, [userId]);

        return rows[0];
    },

    async deleteValidationCode(codeId) {
        const statement = `
      DELETE FROM validation_codes
      WHERE id = ?
    `;
        await db.execute(statement, [codeId]);
    },
    async setEmailValidated(userId) {
        const statement = `
      UPDATE users
      SET emailValidated = true
      WHERE id = ?
    `;
        await db.execute(statement, [userId]);
    },

    async searchByTerm(searchTerm, orderby, order) {
        console.log("searchTerm:", searchTerm);
        const likeTerm = `%${searchTerm}%`;
        let orderByClause;

        if (orderby === "likes") {
            orderByClause = "ORDER BY likes";
        } else {
            orderByClause = "ORDER BY p.createdAt";
        }

        if (order === "asc") {
            orderByClause += " ASC";
        } else {
            orderByClause += " DESC";
        }
        const statement = `
      SELECT
        p.id,
        p.userId,
        p.title,
        p.place,
        COALESCE(l.like_count, 0) AS likes,
        COALESCE(c.comment_count, 0) as comments,
        (
            SELECT imageURL
            FROM post_photos
            WHERE postId = p.id
            ORDER BY id ASC
            LIMIT 1
        ) as mainImage,
        u.name as userName,
        u.avatarURL as userAvatar,
        p.createdAt
      FROM
        posts p
        LEFT JOIN users u
        ON p.userId = u.id
        LEFT JOIN (
            SELECT postId, COUNT(*) AS like_count
            FROM post_likes
            GROUP BY postId
        ) l ON p.id = l.postId
        LEFT JOIN (
            SELECT postId, COUNT(*) AS comment_count
            FROM post_comments
            GROUP BY postId
        ) c ON p.id = c.postId
      WHERE 
        title LIKE ? 
      OR
        place LIKE ?
      ${orderByClause}
    `;
        const [rows] = await db.execute(statement, [likeTerm, likeTerm]);
        return rows.map((p) => {
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                place: p.place,
                likes: p.likes,
                comments: p.comments,
                mainImage: p.mainImage,
                createdAt: p.createdAt,
                user: {
                    id: p.userId,
                    name: p.userName,
                    avatarURL: p.userAvatar,
                },
            };
        });
    },
};
