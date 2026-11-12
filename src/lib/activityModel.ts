// What a visitor did on the website, shared by the server log and the admin page.
// Nothing here may touch the server.

export const activityTypes = [
  "profile_download",
  "contact_form",
  "article_unlock",
  "chat_lead",
  "job_application",
  "whatsapp_click",
  "apply_click",
  "email_click",
  "phone_click",
] as const;

export type ActivityType = (typeof activityTypes)[number];

// Clicks are sent from the browser; forms are recorded by their own server actions
export const clickTypes: ActivityType[] = ["whatsapp_click", "apply_click", "email_click", "phone_click"];

export const activityLabels: Record<ActivityType, string> = {
  profile_download: "Downloaded company profile",
  contact_form: "Sent contact form",
  article_unlock: "Unlocked a blog article",
  chat_lead: "Left contact details in chat",
  job_application: "Applied for a job",
  whatsapp_click: "Clicked WhatsApp",
  apply_click: "Clicked Apply",
  email_click: "Clicked an email address",
  phone_click: "Clicked a phone number",
};

export type ActivityRow = {
  time: string;
  type: ActivityType;
  page: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  detail: string;
  // Stored CV file name, for job applications
  file?: string;
  lang: string;
};

export const isActivityType = (value: unknown): value is ActivityType => activityTypes.includes(value as ActivityType);
