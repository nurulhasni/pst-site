"use client";

import { useActionState, useEffect, useRef } from "react";
import { updatePassword } from "@/app/admin/settings/actions";
import { AdminCard, AdminField, AdminNotice, AdminTableHead } from "@/components/admin/AdminUi";
import type { FormState } from "@/lib/adminForms";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export type AdminUserSummary = {
  email: string;
  name: string;
  active: boolean;
  lastLogin: string;
  source: "sheet" | "env";
};

// Fixed locale and time zone so the server and browser print the same text
const signIn = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

function lastSignIn(value: string): string {
  const time = Date.parse(value);
  return Number.isNaN(time) ? "—" : `${signIn.format(time)} WIB`;
}

function initials(user: AdminUserSummary): string {
  const words = (user.name || user.email.split("@")[0]).split(/[\s._-]+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
}

function StatusBadge({ user }: { user: AdminUserSummary }) {
  const [label, colors] =
    user.source === "env"
      ? ["Server .env", "bg-[#000354] text-[#FFFFFF]"]
      : user.active
        ? ["Active", "bg-[#F5FAE5] text-[#188918]"]
        : ["Disabled", "bg-[#EAECEE] text-[#475E75]"];
  return <span className={`box-border w-fit shrink-0 p-[3px_10px] rounded-[999px] text-[12px]/[16px] ${colors} ${font} font-medium [white-space:nowrap]`}>{label}</span>;
}

export function AdminUsersCard({ users, sheetReadable, currentEmail }: { users: AdminUserSummary[]; sheetReadable: boolean; currentEmail: string }) {
  return (
    <AdminCard id="admin-users" title="Admin users" sub="People who can sign in to this admin">
      {!sheetReadable && (
        <AdminNotice tone="info">The Admin Users tab couldn&apos;t be read right now, so only the emergency accounts from the server&apos;s .env are listed.</AdminNotice>
      )}
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] overflow-hidden">
        <AdminTableHead
          columns={[
            { label: "USER", flex: true },
            { label: "STATUS", width: "w-[120px] max-sm:hidden" },
            { label: "LAST SIGN-IN", width: "w-[170px] max-md:hidden" },
          ]}
        />
        {users.length === 0 && (
          <div className={`w-full p-[16px] text-[14px]/[20px] text-[#475E75] ${font} font-normal [border-top:1px_solid_#D5DADD]`}>No admin accounts yet.</div>
        )}
        {users.map((user) => (
          <div key={user.email} className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_16px] justify-start items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[12px] justify-start items-center">
              <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row justify-center items-center bg-[#A6CBD3] rounded-[999px]">
                <span className={`text-[13px]/[17px] text-[#000354] ${font} font-medium`}>{initials(user)}</span>
              </div>
              <div className="box-border min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                <div className={`text-[14px]/[18px] text-[#000000] ${font} font-medium text-left truncate max-w-full`}>
                  {user.name || user.email}
                  {user.email === currentEmail && <span className="text-[#2F6E80]"> · you</span>}
                </div>
                <div className={`text-[12px]/[16px] text-[#475E75] ${font} font-normal text-left truncate max-w-full`}>{user.email}</div>
              </div>
            </div>
            <div className="box-border w-[120px] shrink-0 flex flex-row max-sm:hidden">
              <StatusBadge user={user} />
            </div>
            <div className={`text-[14px]/[18px] w-[170px] shrink-0 text-[#354A5F] ${font} font-normal text-left max-md:hidden`}>{lastSignIn(user.lastLogin)}</div>
          </div>
        ))}
      </div>
      <p className={`text-[13px]/[19px] text-[#475E75] ${font} font-normal text-left`}>
        To add or disable an admin, edit the Admin Users tab in the Google Sheet (status Active or Disabled). A new admin gets a temporary password
        from IT, made with <code>npm run hash-password</code>, and changes it under Security after signing in.
      </p>
    </AdminCard>
  );
}

export function ChangePasswordCard({ canChange }: { canChange: boolean }) {
  const [state, action, saving] = useActionState<FormState, FormData>(updatePassword, { message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the three fields once the change went through
  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <AdminCard id="security" title="Security" sub="Change the password you sign in with">
      {canChange ? (
        <form ref={formRef} action={action} className="box-border w-full h-fit shrink-0 flex flex-col gap-[16px] justify-start items-start">
          {state.message && <AdminNotice tone={state.ok ? "info" : "error"}>{state.message}</AdminNotice>}
          <AdminField label="Current password" name="currentPassword" type="password" className="max-w-[420px]" />
          <AdminField label="New password" name="newPassword" type="password" hint="At least 12 characters." className="max-w-[420px]" />
          <AdminField label="Repeat new password" name="repeatPassword" type="password" className="max-w-[420px]" />
          <button type="submit" disabled={saving} className={`box-border w-fit h-[44px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[15px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            {saving ? "Saving…" : "Change password"}
          </button>
        </form>
      ) : (
        <AdminNotice tone="info">You signed in with an emergency account from the server&apos;s .env file. Its password can only be changed there, by IT.</AdminNotice>
      )}
    </AdminCard>
  );
}
