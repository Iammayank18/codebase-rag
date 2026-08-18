export type Role = "admin" | "teacher" | "parent";

/** Blocks the request unless the logged-in user has this role. */
export function requireRole(role: Role) {
  return function (req: any, res: any, next: any) {
    if (!req.user) {
      return res.status(401).send("not logged in");
    }
    if (req.user.role !== role) {
      return res.status(403).send("forbidden");
    }
    next();
  };
}
