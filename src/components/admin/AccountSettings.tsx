"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { addUser, manageUser, updatePassword, type AccountFormState } from "@/app/admin/settings/actions";
import { AdminCard, AdminField, AdminNotice, AdminTableHead } from "@/components/admin/AdminUi";
import type { FormState } from "@/lib/adminForms";
import { useHydrated } from "@/lib/useHydrated";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export type AdminUserSummary = {
  email: string;
  name: string;
  active: boolean;
  role: "Admin" | "Editor";
  mustChangePassword: boolean;
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

const pill = `box-border w-fit shrink-0 p-[3px_10px] rounded-[999px] text-[12px]/[16px] ${font} font-medium [white-space:nowrap]`;

function StatusBadge({ user }: { user: AdminUserSummary }) {
  const [label, colors] =
    user.source === "env"
      ? ["Server .env", "bg-[#000354] text-[#FFFFFF]"]
      : !user.active
        ? ["Disabled", "bg-[#EAECEE] text-[#475E75]"]
        : user.mustChangePassword
          ? ["Temp. password", "bg-[#FFF8D6] text-[#AA5500]"]
          : ["Active", "bg-[#F5FAE5] text-[#188918]"];
  return <span className={`${pill} ${colors}`}>{label}</span>;
}

function RoleBadge({ role }: { role: AdminUserSummary["role"] }) {
  return <span className={`${pill} ${role === "Admin" ? "bg-[#EAF3F5] text-[#2F6E80]" : "bg-[#F5F6F7] text-[#354A5F]"}`}>{role}</span>;
}

const smallButton = `box-border w-fit shrink-0 h-[32px] flex flex-row p-[0px_12px] justify-center items-center rounded-[8px] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] bg-[#FFFFFF] hover:bg-[#EAF3F5] disabled:opacity-60 disabled:cursor-wait text-[13px]/[17px] text-[#2F6E80] ${font} font-medium [white-space:nowrap] cursor-pointer transition-colors`;

// Shown once after an account is added or reset; the plain password is not kept anywhere
function TemporaryPassword({ state }: { state: AccountFormState }) {
  const [copied, setCopied] = useState(false);
  if (!state.tempPassword) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(state.tempPassword ?? "");
      setCopied(true);
    } catch {
      // Clipboard blocked: the password is still on screen to select by hand
    }
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[16px] bg-[#FFF8D6] [outline:1px_solid_#E76500] [outline-offset:-0.5px] rounded-[8px]">
      <div className={`text-[14px]/[20px] text-[#000000] ${font} font-medium`}>Temporary password for {state.email}</div>
      <div className="box-border w-full flex flex-row flex-wrap gap-[12px] items-center">
        <code className="box-border p-[8px_12px] bg-[#FFFFFF] rounded-[6px] text-[18px]/[24px] tracking-[1px] text-[#000354] select-all">{state.tempPassword}</code>
        <button type="button" onClick={copy} className={smallButton}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className={`text-[13px]/[19px] text-[#354A5F] ${font} font-normal`}>
        This is shown only once. Send it to them privately; they will be asked to choose their own password when they sign in.
      </div>
    </div>
  );
}

function AddUserForm() {
  const ready = useHydrated();
  const [state, action, saving] = useActionState<AccountFormState, FormData>(addUser, { message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="box-border w-full h-fit shrink-0 flex flex-col gap-[16px] p-[16px] bg-[#F5F6F7] rounded-[8px]">
      <div className={`text-[15px]/[20px] text-[#000000] ${font} font-medium`}>Add a person</div>
      {state.message && <AdminNotice tone={state.ok ? "info" : "error"}>{state.message}</AdminNotice>}
      {state.ok && <TemporaryPassword state={state} />}
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-end max-md:flex-col max-md:items-stretch">
        <AdminField label="Email" name="email" type="email" placeholder="name@pst.co.id" className="[flex:1_1_0]" />
        <AdminField label="Name" name="name" placeholder="Full name" className="[flex:1_1_0]" />
        <label className="box-border w-[160px] max-md:w-full shrink-0 h-fit flex flex-col gap-[8px]">
          <span className={`text-[14px]/[18px] text-[#223548] ${font} font-medium`}>Role</span>
          <div className="box-border w-full h-[48px] flex flex-row p-[0px_16px] items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
            <select name="role" defaultValue="Editor" disabled={!ready} className={`w-full bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none cursor-pointer`}>
              <option>Editor</option>
              <option>Admin</option>
            </select>
          </div>
        </label>
        <button type="submit" disabled={!ready || saving} className={`box-border w-fit max-md:w-full shrink-0 h-[48px] flex flex-row p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[15px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
          {saving ? "Adding…" : "Add"}
        </button>
      </div>
      <div className={`text-[13px]/[19px] text-[#475E75] ${font} font-normal`}>
        Editor: manages website content. Admin: also manages these accounts.
      </div>
    </form>
  );
}

function UserActions({ user, run, busy }: { user: AdminUserSummary; run: (formData: FormData) => void; busy: boolean }) {
  const ready = useHydrated();
  const disabled = !ready || busy;
  return (
    <form action={run} className="box-border w-fit shrink-0 flex flex-row flex-wrap gap-[8px] justify-end items-center">
      <input type="hidden" name="email" value={user.email} />
      <button type="submit" name="intent" value={user.role === "Admin" ? "make-editor" : "make-admin"} disabled={disabled} className={smallButton}>
        {user.role === "Admin" ? "Make Editor" : "Make Admin"}
      </button>
      <button type="submit" name="intent" value="reset" disabled={disabled || !user.active} className={smallButton}>
        Reset password
      </button>
      <button type="submit" name="intent" value={user.active ? "disable" : "enable"} disabled={disabled} className={`${smallButton} ${user.active ? "text-[#AA0808]" : ""}`}>
        {user.active ? "Disable" : "Enable"}
      </button>
    </form>
  );
}

export function AdminUsersCard({ users, sheetReadable, currentEmail }: { users: AdminUserSummary[]; sheetReadable: boolean; currentEmail: string }) {
  const [state, run, busy] = useActionState<AccountFormState, FormData>(manageUser, { message: "" });

  return (
    <AdminCard id="admin-users" title="Admin users" sub="People who can sign in to this admin">
      {!sheetReadable && (
        <AdminNotice tone="info">The Admin Users tab couldn&apos;t be read right now, so only the emergency accounts from the server&apos;s .env are listed.</AdminNotice>
      )}
      {sheetReadable && <AddUserForm />}
      {state.message && <AdminNotice tone={state.ok ? "info" : "error"}>{state.message}</AdminNotice>}
      {state.ok && <TemporaryPassword state={state} />}
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] overflow-hidden">
        <AdminTableHead
          columns={[
            { label: "USER", flex: true },
            { label: "ROLE", width: "w-[80px] max-sm:hidden" },
            { label: "STATUS", width: "w-[130px] max-sm:hidden" },
            { label: "LAST SIGN-IN", width: "w-[170px] max-xl:hidden" },
          ]}
        />
        {users.length === 0 && (
          <div className={`w-full p-[16px] text-[14px]/[20px] text-[#475E75] ${font} font-normal [border-top:1px_solid_#D5DADD]`}>No admin accounts yet.</div>
        )}
        {users.map((user) => (
          <div key={user.email} className="w-full h-fit shrink-0 flex flex-col gap-[10px] p-[12px_16px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className="w-full h-fit flex flex-row gap-[16px] justify-start items-center">
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
              <div className="box-border w-[80px] shrink-0 flex flex-row max-sm:hidden">
                <RoleBadge role={user.role} />
              </div>
              <div className="box-border w-[130px] shrink-0 flex flex-row max-sm:hidden">
                <StatusBadge user={user} />
              </div>
              <div className={`text-[14px]/[18px] w-[170px] shrink-0 text-[#354A5F] ${font} font-normal text-left max-xl:hidden`}>{lastSignIn(user.lastLogin)}</div>
            </div>
            {/* .env accounts can only be changed on the server, and nobody edits their own row here */}
            {user.source === "sheet" && user.email !== currentEmail && (
              <div className="w-full flex flex-row justify-end max-sm:justify-start">
                <UserActions user={user} run={run} busy={busy} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className={`text-[13px]/[19px] text-[#475E75] ${font} font-normal text-left`}>
        A new or reset account gets a temporary password, shown here once, that must be changed at the first sign-in. Accounts marked
        &quot;Server .env&quot; are emergency logins and can only be changed on the server.
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

// Everything else in the admin stays closed until a temporary password is replaced
export function TemporaryPasswordView() {
  return (
    <div className="box-border w-full max-w-[720px] h-fit shrink-0 flex flex-col gap-[24px] p-[32px] max-lg:p-[20px]">
      <AdminNotice tone="info">
        You signed in with a temporary password. Choose your own password to continue; enter the temporary one as your current password.
      </AdminNotice>
      <ChangePasswordCard canChange />
    </div>
  );
}
