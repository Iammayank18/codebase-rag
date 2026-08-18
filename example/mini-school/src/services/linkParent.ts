import { Parent, findParentById, saveParent } from "../models/parent";
import { findStudentById } from "../models/student";

/**
 * Connects a parent account to a student record so the parent
 * can see that student's fees and attendance. One parent may be
 * linked to several students, for siblings at the same school.
 */
export async function linkParentToStudent(
  parentId: string,
  studentId: string,
): Promise<Parent> {
  const parent = findParentById(parentId);
  if (!parent) throw new Error("parent not found: " + parentId);

  const student = findStudentById(studentId);
  if (!student) throw new Error("student not found: " + studentId);

  if (parent.linkedStudentIds.includes(student.id)) {
    return parent; // already linked, no-op
  }

  parent.linkedStudentIds.push(student.id);
  await saveParent(parent);
  return parent;
}
