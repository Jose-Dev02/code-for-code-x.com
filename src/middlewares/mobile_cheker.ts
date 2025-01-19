import { NextFunction, Request, Response } from "express";

export const mobileCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAgent = req.headers["user-agent"] || "";

  const mobileRegex =
    /android|iphone|ipad|ipod|windows phone|blackberry|harmonyos|kaios|mobile|opera mini|nokia|samsung|sony|lg|htc|motorola|zte|huawei|meizu|alcatel|lenovo|vivo|oppo|oneplus|micromax|xiaomi|redmi|infinix|tecno|realme|poco|coolpad|google pixel/i.test(
      userAgent
    );

  if (!mobileRegex) {
    return res
      .status(403)
      .json({ error: "Acceso restringido a dispositivos móviles." });
  }

  next();
};
