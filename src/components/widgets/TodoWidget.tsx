import React, { useState, useEffect } from "react";
import { CheckSquare, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

interface Todo { id: string; text: string; done: boolean; }

export const TodoWidget = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const s = localStorage.getItem("lumina_todos");
    return s ? JSON.parse(s) : [
      { id: "1", text: "Vérifier les logs du serveur", done: false },
      { id: "2", text: "Mettre à jour LuminaOS", done: true },
    ];
  });
  const [input, setInput] = useState("");

  useEffect(() => { localStorage.setItem("lumina_todos", JSON.stringify(todos)); }, [todos]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([{ id: Date.now().toString(), text: input.trim(), done: false }, ...todos]);
    setInput("");
  };

  const toggle = (id: string) => setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const del = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const pending = todos.filter(t => !t.done).length;

  return (
    <GlassCard delay={0.2} accent="none">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CheckSquare style={{ width: 18, height: 18, color: "#34d399" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Tâches</span>
        </div>
        {pending > 0 && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: "#34d399",
            background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 99, padding: "2px 8px",
          }}>
            {pending} en cours
          </span>
        )}
      </div>

      {/* Add form */}
      <form onSubmit={add} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nouvelle tâche…"
          style={{
            flex: 1, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12, padding: "11px 14px", color: "white", fontSize: 14, outline: "none",
          }}
          onFocus={e => (e.target.style.borderColor = "rgba(52,211,153,0.4)")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          style={{
            background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 12, padding: "0 14px", color: "#34d399", cursor: "pointer",
            opacity: input.trim() ? 1 : 0.4,
          }}
        >
          <Plus style={{ width: 18, height: 18 }} />
        </button>
      </form>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {todos.length === 0 && (
          <p style={{ fontSize: 13, color: "#374151", textAlign: "center", padding: "12px 0" }}>
            Aucune tâche
          </p>
        )}
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: "12px 14px",
              border: `1px solid ${todo.done ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            <button onClick={() => toggle(todo.id)} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0 }}>
              {todo.done
                ? <CheckCircle2 style={{ width: 20, height: 20, color: "#34d399" }} />
                : <Circle style={{ width: 20, height: 20, color: "#374151" }} />
              }
            </button>
            <span style={{
              flex: 1, fontSize: 14, lineHeight: 1.4,
              color: todo.done ? "#374151" : "#e5e7eb",
              textDecoration: todo.done ? "line-through" : "none",
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => del(todo.id)}
              style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", padding: 4, flexShrink: 0 }}
            >
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
