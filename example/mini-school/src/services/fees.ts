import { Student, findStudentById } from "../models/student";

const FEE_PER_MONTH = 2500;
const LATE_PENALTY   = 200;

/** How much this student owes right now, in rupees. */
export function calculateDue(studentId: string, monthsUnpaid: number): number {
  const student = findStudentById(studentId);
  if (!student) throw new Error("student not found");
  if (student.feeStatus === "paid") return 0;

  const base = FEE_PER_MONTH * monthsUnpaid;
  const penalty = monthsUnpaid > 2 ? LATE_PENALTY * monthsUnpaid : 0;
  return base + penalty;
}

export function isOverdue(student: Student): boolean {
  return student.feeStatus === "due";
}
