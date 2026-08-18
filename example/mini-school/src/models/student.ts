export interface Student {
  id: string;
  name: string;
  classId: string;
  feeStatus: "paid" | "due";
}

const students: Student[] = [];

/** Look up one student by id. Returns null when not found. */
export function findStudentById(id: string): Student | null {
  return students.find(s => s.id === id) ?? null;
}

export function allStudentsInClass(classId: string): Student[] {
  return students.filter(s => s.classId === classId);
}
