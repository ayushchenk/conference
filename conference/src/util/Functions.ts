import { User } from "../types/User";

//string of type "{0} text {1} ..."
export function format(str: string, ...params: any[]) {
  return str.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof params[index] == "undefined" ? match : params[index];
  });
}

export function buildFormData(values: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const [field, value] of Object.entries(values)) {
    if (value instanceof File) {
      formData.append(field, value);
      continue;
    }

    if (Array.isArray(value)) {
      const values = Array.from(value);
      for (const val of values) {
        formData.append(field, val instanceof File ? val : String(val));
      }
    }

    formData.append(field, String(value));
  }
  return formData;
}

export function getConferenceRoles(user: User | null, conferenceId: number) {
  return user?.roles[conferenceId] ?? [];
}