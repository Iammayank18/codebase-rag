export interface Parent {
  id: string;
  name: string;
  email: string;
  linkedStudentIds: string[];
}

const parents: Parent[] = [];

export function findParentById(id: string): Parent | null {
  return parents.find(p => p.id === id) ?? null;
}

export async function saveParent(parent: Parent): Promise<void> {
  const i = parents.findIndex(p => p.id === parent.id);
  if (i >= 0) parents[i] = parent;
}
