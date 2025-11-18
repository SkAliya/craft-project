import { Request, Response } from "express";
import { AnalyticsService } from "../services/analyticsService";

export function getAnalytics(req: Request, res: Response) {
  try {
    const from = req.query.from as string;
    const to = req.query.to as string;
    if (!from || !to)
      return res.status(400).json({ error: "from and to required" });
    const rows = AnalyticsService.get(from, to);
    return res.json(rows);
  } catch (err: any) {
    return res.status(500).json({ error: "Internal error" });
  }
}
