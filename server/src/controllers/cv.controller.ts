import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCV = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;
    const cv = await prisma.cV.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to create CV" });
  }
};

export const getCVs = async (req: Request, res: Response) => {
  try {
    const cvs = await prisma.cV.findMany({
      include: { user: true },
    });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CVs" });
  }
};
