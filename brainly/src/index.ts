import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import { signupSchema, signinSchema, contentSchema, deleteContentSchema, shareSchema } from "./validation";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { username, password } = parseResult.data;

    try {
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(411).json({ message: "User already exists" });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const parseResult = signinSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { username, password } = parseResult.data;

    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const parseResult = contentSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { link, type, title } = parseResult.data;

    await ContentModel.create({
        link,
        type,
        title,
        userId: req.userId,
        tags: []
    });

    res.json({ message: "Content added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate("userId", "username");
    res.json({ content });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const parseResult = deleteContentSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { contentId } = parseResult.data;

    await ContentModel.deleteMany({ contentId, userId: req.userId });
    res.json({ message: "Deleted" });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const parseResult = shareSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.issues });
    }

    const { share } = parseResult.data;

    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            return res.json({ hash: existingLink.hash });
        }
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});
