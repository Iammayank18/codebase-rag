import { requireRole } from "../middleware/requireRole";
import { linkParentToStudent } from "../services/linkParent";
import { calculateDue } from "../services/fees";

export function registerAdminRoutes(router: any) {
  router.use(requireRole("admin"));

  router.post("/link", async (req: any, res: any) => {
    const parent = await linkParentToStudent(
      req.body.parentId,
      req.body.studentId,
    );
    res.json(parent);
  });

  router.get("/fees/:id", (req: any, res: any) => {
    res.json({ due: calculateDue(req.params.id, req.query.months) });
  });
}
