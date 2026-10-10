"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Copy, Lock, Plus, Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  arrayTemplate, blankFrom, humanize, isPlainObject, isSafeUrl, itemTitle, resolveHint, type PathSegment,
} from "@/lib/cms/content/schema";
import type { ContentSchema, FieldHint } from "@/lib/cms/content/types";

/**
 * Schema-driven form. The shape of each field (text, list, group, toggle...) is
 * inferred from the document's default value, refined by optional hints.
 */

export interface FieldProps {
  schema: ContentSchema;
  path: PathSegment[];
  value: unknown;
  defaultValue: unknown;
  onChange: (value: unknown) => void;
  label?: string;
}

const inputCls =
  "w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#FA5B0F]/70 focus:ring-2 focus:ring-[#FA5B0F]/20 transition";

function FieldLabel({ label, hint, htmlFor }: { label: string; hint: FieldHint; htmlFor?: string }) {
  return (
    <div className="mb-1.5">
      <label htmlFor={htmlFor} className="block text-xs font-medium text-slate-300">
        {hint.label ?? label}
      </label>
      {hint.help && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{hint.help}</p>}
    </div>
  );
}

const fieldId = (path: PathSegment[]) => `field-${path.join("-")}`;

/** Fields that should take the full row in a two-column group. */
export function isWide(schema: ContentSchema, path: PathSegment[], defaultValue: unknown): boolean {
  if (typeof defaultValue !== "string") return typeof defaultValue !== "boolean" && typeof defaultValue !== "number";
  return resolveHint(schema, path, defaultValue).kind === "textarea";
}

export function Field(props: FieldProps) {
  const { schema, path, defaultValue } = props;
  const hint = resolveHint(schema, path, defaultValue);
  if (hint.hidden) return null;

  if (typeof defaultValue === "string") return <StringField {...props} hint={hint} />;
  if (typeof defaultValue === "number") return <NumberField {...props} hint={hint} />;
  if (typeof defaultValue === "boolean") return <BooleanField {...props} hint={hint} />;
  if (Array.isArray(defaultValue)) return <ArrayField {...props} hint={hint} />;
  if (isPlainObject(defaultValue)) return <ObjectField {...props} hint={hint} />;
  return null;
}

function StringField({ path, value, onChange, label, hint }: FieldProps & { hint: FieldHint }) {
  const id = fieldId(path);
  const text = typeof value === "string" ? value : "";
  const name = label ?? humanize(String(path[path.length - 1] ?? ""));
  const urlInvalid = (hint.kind === "url" || hint.kind === "image") && !isSafeUrl(text);

  let control: React.ReactNode;
  if (hint.kind === "select" && hint.options) {
    const options = hint.options.includes(text) ? hint.options : [text, ...hint.options];
    control = (
      <select id={id} value={text} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => (
          <option key={o} value={o}>{o || "—"}</option>
        ))}
      </select>
    );
  } else if (hint.kind === "textarea") {
    control = (
      <textarea
        id={id}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(10, Math.max(3, Math.ceil(text.length / 90)))}
        className={cn(inputCls, "leading-relaxed resize-y")}
      />
    );
  } else if (hint.kind === "color") {
    control = (
      <div className="flex items-center gap-2">
        <input type="color" value={text || "#000000"} onChange={(e) => onChange(e.target.value)} className="w-10 h-9 rounded border border-slate-700 bg-transparent cursor-pointer" />
        <input id={id} value={text} onChange={(e) => onChange(e.target.value)} className={cn(inputCls, "font-mono")} />
      </div>
    );
  } else {
    control = (
      <input
        id={id}
        type="text"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={hint.kind === "url" ? "/path or https://…" : undefined}
        className={cn(inputCls, hint.kind === "url" || hint.kind === "image" ? "font-mono text-xs" : "")}
      />
    );
  }

  return (
    <div>
      <FieldLabel label={name} hint={hint} htmlFor={id} />
      {hint.kind === "image" && text && isSafeUrl(text) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={text} alt="" className="mb-2 h-24 w-auto max-w-full rounded-lg border border-slate-800 object-cover" />
      )}
      {control}
      {urlInvalid && (
        <p className="mt-1 text-[11px] text-amber-400 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Use a site path (/about), https:// URL, mailto: or tel:. Unsafe links are not saved.
        </p>
      )}
    </div>
  );
}

function NumberField({ path, value, onChange, label, hint }: FieldProps & { hint: FieldHint }) {
  const id = fieldId(path);
  return (
    <div>
      <FieldLabel label={label ?? humanize(String(path[path.length - 1]))} hint={hint} htmlFor={id} />
      <input
        id={id}
        type="number"
        value={typeof value === "number" ? value : 0}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={inputCls}
      />
    </div>
  );
}

function BooleanField({ path, value, onChange, label, hint }: FieldProps & { hint: FieldHint }) {
  const on = value === true;
  return (
    <label className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5 cursor-pointer">
      <span>
        <span className="block text-xs font-medium text-slate-300">{hint.label ?? label ?? humanize(String(path[path.length - 1]))}</span>
        {hint.help && <span className="block text-[11px] text-slate-500 mt-0.5">{hint.help}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={cn("relative h-5 w-9 shrink-0 rounded-full transition", on ? "bg-[#FA5B0F]" : "bg-slate-700")}
      >
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all", on ? "left-[18px]" : "left-0.5")} />
      </button>
    </label>
  );
}

/** Nested group of fields, laid out in two columns with long fields spanning both. */
export function ObjectFields({ schema, path, value, defaultValue, onChange }: Omit<FieldProps, "label">) {
  const obj = isPlainObject(value) ? value : {};
  const defs = defaultValue as Record<string, unknown>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(defs).map(([key, def]) => {
        const childPath = [...path, key];
        if (resolveHint(schema, childPath, def).hidden) return null;
        return (
          <div key={key} className={isWide(schema, childPath, def) ? "md:col-span-2" : undefined}>
            <Field
              schema={schema}
              path={childPath}
              value={obj[key]}
              defaultValue={def}
              onChange={(v) => onChange({ ...obj, [key]: v })}
            />
          </div>
        );
      })}
    </div>
  );
}

function ObjectField(props: FieldProps & { hint: FieldHint }) {
  const { path, label, hint } = props;
  return (
    <fieldset className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <legend className="px-1.5 text-xs font-semibold text-slate-200">{hint.label ?? label ?? humanize(String(path[path.length - 1]))}</legend>
      {hint.help && <p className="text-[11px] text-slate-500 -mt-1 mb-3">{hint.help}</p>}
      <ObjectFields {...props} />
    </fieldset>
  );
}

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ArrayField({ schema, path, value, defaultValue, onChange, label, hint }: FieldProps & { hint: FieldHint }) {
  const items = Array.isArray(value) ? value : [];
  const defaults = defaultValue as unknown[];
  const template = arrayTemplate(schema, path, defaults);
  const locked = Boolean(hint.fixedLength);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const name = hint.label ?? label ?? humanize(String(path[path.length - 1]));
  const primitive = typeof template === "string";

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const add = () => {
    if (template === undefined) return;
    onChange([...items, blankFrom(template)]);
    setOpen((prev) => new Set(prev).add(items.length));
  };
  const remove = (i: number) => {
    const what = itemTitle(items[i], i);
    if (!primitive && !confirm(`Remove "${what}"?`)) return;
    onChange(items.filter((_, idx) => idx !== i));
    setOpen(new Set());
  };
  const duplicate = (i: number) => {
    onChange([...items.slice(0, i + 1), structuredClone(items[i]), ...items.slice(i + 1)]);
    setOpen(new Set([i + 1]));
  };
  const reorder = (i: number, dir: -1 | 1) => {
    onChange(move(items, i, i + dir));
    setOpen(new Set());
  };
  const itemDefault = (i: number) => (i < defaults.length ? defaults[i] : template);
  const update = (i: number, v: unknown) => onChange(items.map((it, idx) => (idx === i ? v : it)));

  const controlBtn = "p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2">
        <div>
          <span className="text-xs font-medium text-slate-300">{name}</span>
          <span className="ml-2 text-[11px] text-slate-500 font-mono">{items.length}</span>
          {hint.help && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug max-w-xl">{hint.help}</p>}
        </div>
        {locked ? (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500"><Lock className="w-3 h-3" /> Fixed list</span>
        ) : !primitive && items.length > 1 ? (
          <button
            type="button"
            onClick={() => setOpen(open.size === items.length ? new Set() : new Set(items.map((_, i) => i)))}
            className="text-[11px] text-slate-400 hover:text-white"
          >
            {open.size === items.length ? "Collapse all" : "Expand all"}
          </button>
        ) : null}
      </div>

      {primitive ? (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <div className="flex-1">
                <Field schema={schema} path={[...path, i]} value={item} defaultValue={itemDefault(i)} onChange={(v) => update(i, v)} label={`${name} ${i + 1}`} />
              </div>
              {!locked && (
                <div className="flex items-center pt-6">
                  <button type="button" className={controlBtn} disabled={i === 0} onClick={() => reorder(i, -1)} aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button type="button" className={controlBtn} disabled={i === items.length - 1} onClick={() => reorder(i, 1)} aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
                  <button type="button" className={cn(controlBtn, "hover:text-red-400")} onClick={() => remove(i)} aria-label="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => {
            const expanded = open.has(i);
            return (
              <div key={i} className={cn("rounded-xl border bg-slate-950/50 transition", expanded ? "border-slate-700" : "border-slate-800")}>
                <div className="flex items-center gap-2 pl-3 pr-1.5 py-1.5">
                  <button type="button" onClick={() => toggle(i)} aria-expanded={expanded} className="flex flex-1 items-center gap-2.5 min-w-0 py-1 text-left">
                    <ChevronDown className={cn("w-4 h-4 shrink-0 text-slate-500 transition-transform", expanded ? "" : "-rotate-90")} />
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-slate-200 truncate">{itemTitle(item, i)}</span>
                  </button>
                  {!locked && (
                    <div className="flex items-center shrink-0">
                      <button type="button" className={controlBtn} disabled={i === 0} onClick={() => reorder(i, -1)} aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button type="button" className={controlBtn} disabled={i === items.length - 1} onClick={() => reorder(i, 1)} aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button type="button" className={controlBtn} onClick={() => duplicate(i)} aria-label="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                      <button type="button" className={cn(controlBtn, "hover:text-red-400")} onClick={() => remove(i)} aria-label="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
                {expanded && (
                  <div className="border-t border-slate-800 p-4">
                    {isPlainObject(itemDefault(i)) ? (
                      <ObjectFields schema={schema} path={[...path, i]} value={item} defaultValue={itemDefault(i)} onChange={(v) => update(i, v)} />
                    ) : (
                      <Field schema={schema} path={[...path, i]} value={item} defaultValue={itemDefault(i)} onChange={(v) => update(i, v)} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!locked && template !== undefined && (
        <button
          type="button"
          onClick={add}
          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-700 text-xs text-slate-300 hover:text-white hover:border-slate-500 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add {primitive ? "line" : "item"}
        </button>
      )}
      {items.length === 0 && (
        <p className="mt-1 text-[11px] text-slate-500">No items yet.</p>
      )}
    </div>
  );
}
