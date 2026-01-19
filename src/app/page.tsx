"use client";

import { useState } from "react";
import { ORGANIZATIONS, type OrganizationKey } from "./config/organizations";

interface Input {
  owner: string;
  repo: string;
  username: string;
  permission: "pull" | "triage" | "push" | "maintain" | "admin";
}

interface Invitation {
  id: number;
  invitee?: {
    login?: string;
  };
}

interface InviteResult {
  status: number;
  message: string;
  invitationId?: number;
}

type Result = {
  ok: boolean;
  error?: string;
  input?: Input;
  foundInvitations?: Invitation[];
  deletedInvitations?: { id: number }[];
  invite?: InviteResult | null;
  dryRun?: boolean;
};

// Primary Theme Colors
const COLORS = {
  primary: "#4f46e5", // Indigo 600
  primaryHover: "#4338ca", // Indigo 700
  accent: "#0ea5e9", // Sky 500
  bgGradient: "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
  textMain: "#1e293b", // Slate 800
  textMuted: "#64748b", // Slate 500
  border: "#e2e8f0",
};

export default function Page() {
  const [organization, setOrganization] = useState<OrganizationKey>("McMasterQM");
  const [assignment, setAssignment] = useState<string>(() => {
    const firstAssignment = Object.keys(ORGANIZATIONS["McMasterQM"].assignments)[0];
    return firstAssignment || "🧑GitHub Fundamentals";
  });
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState<"pull"|"triage"|"push"|"maintain"|"admin">("push");
  const [dryRun, setDryRun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const assignmentPrefix = ORGANIZATIONS[organization].assignments[assignment as keyof typeof ORGANIZATIONS[typeof organization]["assignments"]];
  const repoName = username && assignmentPrefix ? `${assignmentPrefix}-${username}` : "";
  const owner = ORGANIZATIONS[organization].owner;

  const handleOrganizationChange = (newOrg: OrganizationKey) => {
    setOrganization(newOrg);
    const firstAssignment = Object.keys(ORGANIZATIONS[newOrg].assignments)[0];
    setAssignment(firstAssignment);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setResult({ ok: false, error: "Username is required" });
      return;
    }
    
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/reinvite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, repo: repoName, username, permission, dryRun }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Request failed";
      setResult({ ok: false, error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: COLORS.bgGradient,
      padding: "2rem 1rem"
    }}>
      <main style={{ 
        maxWidth: 680, 
        margin: "0 auto", 
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        padding: "2.5rem",
        fontFamily: "Inter, -apple-system, system-ui, sans-serif"
      }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "2.25rem", 
            fontWeight: "800", 
            color: COLORS.textMain, 
            margin: "0 0 0.5rem 0",
            letterSpacing: "-0.025em"
          }}>
            GitHub <span style={{ color: COLORS.primary }}>Re-invite</span>
          </h1>
          <p style={{ 
            fontSize: "1.05rem", 
            color: COLORS.textMuted, 
            margin: "0",
            lineHeight: "1.5"
          }}>
            Clean up stale invitations and sync student repositories
          </p>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: COLORS.textMain }}>
              Organization
            </label>
            <select 
              value={organization} 
              onChange={e => handleOrganizationChange(e.target.value as OrganizationKey)}
              style={{
                padding: "0.75rem 1rem",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                fontSize: "1rem",
                outline: "none",
                background: "#fcfcfd",
                cursor: "pointer"
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border}
            >
              {Object.entries(ORGANIZATIONS).map(([key, org]) => (
                <option key={key} value={key}>🏫 {org.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: COLORS.textMain }}>
              Assignment
            </label>
            <select 
              value={assignment} 
              onChange={e => setAssignment(e.target.value)}
              style={{
                padding: "0.75rem 1rem",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                fontSize: "1rem",
                outline: "none",
                background: "#fcfcfd"
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border}
            >
              {Object.entries(ORGANIZATIONS[organization].assignments).map(([key]) => (
                <option key={key} value={key}>📝 {key}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: COLORS.textMain }}>
              GitHub Username
            </label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="e.g. octocat" 
              required 
              style={{
                padding: "0.75rem 1rem",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                fontSize: "1rem",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border}
            />
          </div>

          <div style={{ 
            padding: "1rem",
            background: "#f8fafc",
            borderRadius: "10px",
            border: `1px dashed ${COLORS.border}`
          }}>
            <label style={{ fontSize: "0.75rem", fontWeight: "700", color: COLORS.textMuted, textTransform: "uppercase" }}>
              Target Repository
            </label>
            <div style={{ fontSize: "0.95rem", color: repoName ? COLORS.primary : COLORS.textMuted, fontFamily: "monospace", marginTop: "0.25rem", fontWeight: "600" }}>
              {repoName || "Waiting for username..."}
            </div>
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.875rem", fontWeight: "600", color: COLORS.textMain }}>
              Permission Level
            </label>
            <select 
              value={permission} 
              onChange={e => setPermission(e.target.value as any)}
              style={{
                padding: "0.75rem 1rem",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                fontSize: "1rem",
                outline: "none",
                background: "#fcfcfd"
              }}
            >
              <option value="pull">📖 Pull (Read)</option>
              <option value="triage">🔍 Triage</option>
              <option value="push">✏️ Push (Write)</option>
              <option value="maintain">🔧 Maintain</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          <div style={{ 
            display: "flex", 
            gap: "0.75rem", 
            alignItems: "center",
            padding: "0.5rem 0"
          }}>
            <input 
              type="checkbox" 
              checked={dryRun} 
              onChange={e => setDryRun(e.target.checked)}
              style={{ width: "18px", height: "18px", accentColor: COLORS.primary, cursor: "pointer" }}
            />
            <label style={{ fontSize: "0.9rem", color: COLORS.textMain, cursor: "pointer", fontWeight: "500" }}>
              Dry run mode <span style={{ color: COLORS.textMuted, fontWeight: "400" }}>(no changes will be made)</span>
            </label>
          </div>

          <button 
            disabled={loading} 
            type="submit"
            style={{
              padding: "1rem",
              background: loading ? "#cbd5e1" : `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.accent})`,
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.1s ease, box-shadow 0.1s ease",
              boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.2)",
              marginTop: "0.5rem"
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.opacity = "1"; }}
          >
            {loading ? "Processing..." : dryRun ? "Simulate Process" : "Send Re-invite"}
          </button>
        </form>

        {result && (
          <section style={{ 
            marginTop: "2rem", 
            paddingTop: "2rem", 
            borderTop: `1px solid ${COLORS.border}` 
          }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "700", color: COLORS.textMain, marginBottom: "1rem" }}>
              {result.ok ? "✨ Success" : "⚠️ Something went wrong"}
            </h2>
            
            {result.ok ? (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "1.25rem" }}>
                {result.invite && (
                  <div style={{ marginBottom: "1rem" }}>
                    <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#166534", fontWeight: "600" }}>Repository ready:</p>
                    <a 
                      href={`https://github.com/${owner}/${repoName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: COLORS.primary, fontWeight: "600", textDecoration: "none", fontSize: "0.9rem", background: "white", padding: "0.5rem", borderRadius: "6px", display: "inline-block", border: "1px solid #bbf7d0" }}
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                )}
                <pre style={{ fontSize: "0.75rem", color: "#166534", margin: "0", overflowX: "auto" }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            ) : (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "1.25rem", color: "#991b1b" }}>
                <pre style={{ fontSize: "0.875rem", whiteSpace: "pre-wrap", margin: "0" }}>{result.error}</pre>
              </div>
            )}
          </section>
        )}
      </main>
      
      <footer style={{ textAlign: "center", marginTop: "2rem", color: COLORS.textMuted, fontSize: "0.8rem" }}>
        <p>© 2025 • GitHub Re-invite Tool • Built with ❤️</p>
      </footer>
    </div>
  );
}